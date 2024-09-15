import os
import re
from time import sleep

import pymysql
from clicknium import clicknium as cc, locator
from clicknium.core.models.web.browsertab import BrowserTab

# db
connection = pymysql.connect(host="localhost", user="root", password="root", db="maple")
cursor = connection.cursor()
TABLE_NAME = "potential"
QUERY_SELECT = f"SELECT * FROM {TABLE_NAME} WHERE type = %s AND grade = %s AND part = %s AND level = %s"

# file
temp_dir = os.getenv("TMPDIR") or os.getenv("TEMP") or os.getenv("TMP") or "/tmp"
path_dir = os.path.join(temp_dir, "mapletool")
path_file = os.path.join(path_dir, "scrape-potential.txt")

# clicknium
RETRY_COUNT = 2
ROUND_NUM_DIGITS = 12
type_to_urls = {
    "레드": "https://maplestory.nexon.com/Guide/OtherProbability/cube/red",
    "블랙": "https://maplestory.nexon.com/Guide/OtherProbability/cube/black",
    "에디": "https://maplestory.nexon.com/Guide/OtherProbability/cube/addi",
    "수상": "https://maplestory.nexon.com/Guide/OtherProbability/cube/strange",
    "장인": "https://maplestory.nexon.com/Guide/OtherProbability/cube/master",
    "명장": "https://maplestory.nexon.com/Guide/OtherProbability/cube/artisan",
    "수에": "https://maplestory.nexon.com/Guide/OtherProbability/cube/strangeAddi",
}
locators_grade = [
    locator.nexon.maplestory.grade.rare,
    locator.nexon.maplestory.grade.epic,
    locator.nexon.maplestory.grade.unique,
    locator.nexon.maplestory.grade.legendary,
]
locators_part = [
    locator.nexon.maplestory.part.weapon,
    locator.nexon.maplestory.part.emblem,
    locator.nexon.maplestory.part.auxiliaryWithoutForceSoul,
    locator.nexon.maplestory.part.forceSoul,
    locator.nexon.maplestory.part.shield,
    locator.nexon.maplestory.part.hat,
    locator.nexon.maplestory.part.upper,
    locator.nexon.maplestory.part.clothes,
    locator.nexon.maplestory.part.bottom,
    locator.nexon.maplestory.part.shoes,
    locator.nexon.maplestory.part.gloves,
    locator.nexon.maplestory.part.cloak,
    locator.nexon.maplestory.part.belt,
    locator.nexon.maplestory.part.shoulder,
    locator.nexon.maplestory.part.face,
    locator.nexon.maplestory.part.eye,
    locator.nexon.maplestory.part.earing,
    locator.nexon.maplestory.part.ring,
    locator.nexon.maplestory.part.pendant,
    locator.nexon.maplestory.part.herart,
]
locators_name = [
    locator.nexon.maplestory.option.name1,
    locator.nexon.maplestory.option.name2,
    locator.nexon.maplestory.option.name3,
]
locators_probability = [
    locator.nexon.maplestory.option.probability1,
    locator.nexon.maplestory.option.probability2,
    locator.nexon.maplestory.option.probability3,
]
levels = [
    0,
    10,
    11,
    20,
    21,
    30,
    31,
    40,
    41,
    50,
    51,
    60,
    61,
    70,
    71,
    80,
    81,
    90,
    91,
    100,
    101,
    110,
    111,
    120,
    201,
]


def main():
    skips = read_skips_on_file()
    tab = cc.chrome.open("about:blank", False)

    for type, url in type_to_urls.items():
        tab.goto(url)
        for locator_grade in locators_grade:
            for locator_part in locators_part:
                for level in levels:
                    part = tab.find_element(locator_part).get_text()
                    grade = tab.find_element(locator_grade).get_text()
                    key = [type, grade, part, level]
                    print(key, end=" ")

                    if exist_data_on_db(key):
                        print("DB")
                        continue

                    if str(key) in skips:
                        print("File")
                        continue

                    data = crawl_data(
                        tab, url, type, locator_grade, locator_part, level
                    )

                    if not data:
                        print("Empty")
                        write_skips_on_file(str(key))
                        continue

                    cursor.execute(generate_insert_query(data))
                    connection.commit()
                    print("Saved " + str(len(data)))

    tab.close()


def read_skips_on_file() -> set[str]:
    if not os.path.exists(path_dir):
        os.makedirs(path_dir)
        return []

    if not os.path.exists(path_file):
        return []

    with open(path_file, "r", encoding="utf-8") as file:
        lines = file.readlines()
        lines_set = set(line.strip() for line in lines)
        return lines_set


def write_skips_on_file(key: str) -> None:
    with open(path_file, "a", encoding="utf-8") as file:
        file.write(key + "\n")


def exist_data_on_db(key: list) -> bool:
    cursor.execute(QUERY_SELECT, key)
    return bool(cursor.fetchone())


def crawl_data(
    tab: BrowserTab, url: str, type: str, locator_grade, locator_part, level: int
) -> list:
    grade = tab.find_element(locator_grade).get_text()
    part = tab.find_element(locator_part).get_text()
    click_locator(tab, url, locator_grade, locator_part, level)

    for i in range(RETRY_COUNT):
        if tab.is_existing(locator.nexon.maplestory.option.level, timeout=1) and (
            tab.find_element(locator.nexon.maplestory.option.level)
            .get_text()
            .startswith(str(level))
        ):
            break
    else:
        return []

    name_grid = list(map(tab.find_elements, locators_name))
    probability_grid = list(map(tab.find_elements, locators_probability))

    data = []
    for i in range(len(name_grid)):
        for j in range(len(name_grid[i])):
            name, value = extract_value_from_name(name_grid[i][j].get_text())
            probability = round(
                float(probability_grid[i][j].get_text().rstrip("%")) / 100,
                ROUND_NUM_DIGITS,
            )
            data.append(
                {
                    "type": type,
                    "grade": grade,
                    "part": part,
                    "level": level,
                    "position": i,
                    "name": name,
                    "param": value,
                    "probability": probability,
                }
            )

    return data


def generate_insert_query(data_list: list) -> str:
    if not data_list:
        return ""

    columns = ", ".join(data_list[0].keys())

    values = ", ".join(
        f"({', '.join(f'\"{value}\"' if isinstance(value, str) else str(value) for value in data.values())})"
        for data in data_list
    )

    return f"INSERT INTO {TABLE_NAME} ({columns}) VALUES {values};"


def click_locator(
    tab: BrowserTab, url: str, locator_grade, locator_part, level: int
) -> None:
    for _ in range(RETRY_COUNT):
        try:
            tab.find_element(locator.nexon.maplestory.grade.select).click()
            tab.find_element(locator_grade).click()
            tab.find_element(locator.nexon.maplestory.part.select).click()
            tab.find_element(locator_part).click()
            tab.find_element(locator.nexon.maplestory.level.input).set_text(str(level))
            tab.find_element(locator.nexon.maplestory.search.button).click()
            sleep(1)
            if tab.url.startswith(url):
                return
            tab.goto(url)
        except:
            tab.goto(url)


# Return: (name, value)
def extract_value_from_name(name: str) -> tuple:
    split_name = name.split("(")
    nums_in_name = re.findall(r"\d+", split_name[0])
    value = int(nums_in_name[-1]) if nums_in_name else 0
    split_name[0] = (
        split_name[0][::-1].replace(str(value)[::-1], "n", 1)[::-1]
        if nums_in_name
        else split_name[0]
    )
    return "(".join(split_name), value


if __name__ == "__main__":
    main()
    cursor.close()
    connection.close()
