import re
from time import sleep

import pymysql
from clicknium import clicknium as cc, locator
from clicknium.core.models.web.browsertab import BrowserTab

RETRY_COUNT = 2
ROUND_NUM_DIGITS = 12
URL = "https://maplestory.nexon.com/Guide/OtherProbability/cube/black"
INSERT_QUERY = ("INSERT INTO potential (part, grade, level, position, name, value, probability)"
                "VALUES (%s, %s, %s, %s, %s, %s, %s)")

connection = pymysql.connect(host='127.0.0.1', user='root', password='root', db='maple', charset='utf8')
cursor = connection.cursor()
locators_part = [locator.nexon.maplestory.part.weapon,
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
                 locator.nexon.maplestory.part.herart]
locators_grade = [locator.nexon.maplestory.grade.rare,
                  locator.nexon.maplestory.grade.epic,
                  locator.nexon.maplestory.grade.unique,
                  locator.nexon.maplestory.grade.legendary]
locators_name = [locator.nexon.maplestory.option.name1,
                 locator.nexon.maplestory.option.name2,
                 locator.nexon.maplestory.option.name3]
locators_probability = [locator.nexon.maplestory.option.probability1,
                        locator.nexon.maplestory.option.probability2,
                        locator.nexon.maplestory.option.probability3]
levels = [0, 10, 11, 20, 21, 30, 31, 40, 41, 50, 51, 60, 61, 70, 71, 80, 81, 90, 91,
          100, 101, 110, 111, 120, 201]


def main():
    tab = cc.chrome.open(URL, False)

    for locator_part in locators_part:
        for locator_grade in locators_grade:
            for level in levels:
                part = tab.find_element(locator_part).get_text()
                grade = tab.find_element(locator_grade).get_text()

                print([part, grade, level], end=' ')
                if exist_data(part, grade, level):
                    print("Exist")
                    continue

                data = crawl_data(tab, locator_part, locator_grade, level)
                print("Saved"
                      if save_data(data)
                      else "Empty")

    tab.close()


def exist_data(part: str, grade: str, level: int) -> bool:
    cursor.execute(f"SELECT * FROM potential WHERE part = '{part}' AND grade = '{grade}' AND level = {level}")
    return bool(cursor.fetchone())


# Return: [(part, grade, level, position, name, value, probability), ...]
def crawl_data(tab: BrowserTab, locator_part, locator_grade, level: int) -> list:
    part = tab.find_element(locator_part).get_text()
    grade = tab.find_element(locator_grade).get_text()
    click_locator(tab, locator_part, locator_grade, level)

    for i in range(RETRY_COUNT):
        if (tab.is_existing(locator.nexon.maplestory.option.level, timeout=1) and
                (tab.find_element(locator.nexon.maplestory.option.level).get_text().startswith(str(level)))):
            break
    else:
        return []

    name_grid = list(map(tab.find_elements, locators_name))
    probability_grid = list(map(tab.find_elements, locators_probability))

    data = []
    for i in range(len(name_grid)):
        for j in range(len(name_grid[i])):
            name_and_value = extract_value_from_name(name_grid[i][j].get_text())
            p = round(float(probability_grid[i][j].get_text().rstrip("%")) / 100, ROUND_NUM_DIGITS)
            data.append((part, grade, level, i) + name_and_value + (p,))

    return data


# Argument: [(part, grade, level, position, name, value, probability), ...]
def save_data(data: list) -> bool:
    if not data:
        return False
    cursor.executemany(INSERT_QUERY, data)
    connection.commit()
    return True


def click_locator(tab: BrowserTab, locator_part, locator_grade, level: int) -> None:
    tab.find_element(locator.nexon.maplestory.grade.select).click()
    tab.find_element(locator_grade).click()
    tab.find_element(locator.nexon.maplestory.part.select).click()
    tab.find_element(locator_part).click()
    tab.find_element(locator.nexon.maplestory.level.input).set_text(str(level))
    tab.find_element(locator.nexon.maplestory.search.button).click()
    sleep(1)


# Return: (name, value)
def extract_value_from_name(name: str) -> tuple:
    split_name = name.split("(")
    nums_in_name = re.findall(r"\d+", split_name[0])
    value = int(nums_in_name[-1]) if nums_in_name else 0
    split_name[0] = split_name[0][::-1].replace(str(value)[::-1], "n", 1)[::-1] if nums_in_name else split_name[0]
    return "(".join(split_name), value


if __name__ == "__main__":
    main()
    cursor.close()
    connection.close()
