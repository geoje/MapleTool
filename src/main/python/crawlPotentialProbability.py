import json
import os.path
import re
from time import sleep

from clicknium import clicknium as cc, locator
from clicknium.core.models.web.browsertab import BrowserTab

URL = "https://maplestory.nexon.com/Guide/OtherProbability/cube/black"
FILENAME = "./tools/potentialProbability.json"
RETRY_COUNT = 2

levels = [0, 10, 11, 20, 21, 30, 31, 40, 41, 50, 51, 60, 61, 70, 71, 80, 81, 90, 91,
          100, 101, 110, 111, 120, 201]

gradeLocators = [locator.nexon.maplestory.grade.rare,
                 locator.nexon.maplestory.grade.epic,
                 locator.nexon.maplestory.grade.unique,
                 locator.nexon.maplestory.grade.legendary]

partLocators = [locator.nexon.maplestory.part.weapon,
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


def main():
    data = {}
    if os.path.exists(FILENAME):
        with open(FILENAME, 'r', encoding='UTF-8') as f:
            data = json.load(f)
    tab = cc.chrome.open(URL, False)

    for partLocator in partLocators:
        for level in levels:
            for gradeLocator in gradeLocators:
                part_str = tab.find_element(partLocator).get_text()
                level_str = str(level)
                grade_str = tab.find_element(gradeLocator).get_text()

                if part_str not in data:
                    data[part_str] = {}
                if level_str not in data[part_str]:
                    data[part_str][level_str] = {}
                if grade_str in data[part_str][level_str]:
                    continue

                print([part_str, level_str, grade_str])
                data[part_str][level_str][grade_str] = crawl_data(tab, partLocator, level_str, gradeLocator)
                with open(FILENAME, 'w', encoding='UTF-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)

    tab.close()


def crawl_data(tab: BrowserTab, partLocator, levelStr, gradeLocator) -> list:
    grade_str = tab.find_element(gradeLocator).get_text()
    tab.find_element(locator.nexon.maplestory.grade.select).click()
    tab.find_element(gradeLocator).click()
    tab.find_element(locator.nexon.maplestory.part.select).click()
    tab.find_element(partLocator).click()
    tab.find_element(locator.nexon.maplestory.level.input).set_text(levelStr)
    tab.find_element(locator.nexon.maplestory.search.button).click()
    sleep(1)

    for i in range(RETRY_COUNT):
        if (tab.is_existing(locator.nexon.maplestory.option.potential, timeout=1) and
                (tab.find_element(locator.nexon.maplestory.option.potential).get_text() == grade_str)):
            break
    else:
        return []

    name_grid = [
        tab.find_elements(locator.nexon.maplestory.option.name1),
        tab.find_elements(locator.nexon.maplestory.option.name2),
        tab.find_elements(locator.nexon.maplestory.option.name3)]
    probability_grid = [
        tab.find_elements(locator.nexon.maplestory.option.probability1),
        tab.find_elements(locator.nexon.maplestory.option.probability2),
        tab.find_elements(locator.nexon.maplestory.option.probability3)]

    pattern = r"\d+"
    result = []
    for i in range(len(name_grid)):
        row = []
        for j in range(len(name_grid[i])):
            name_and_value = extract_value_from_option(name_grid[i][j].get_text())
            p = round(float(probability_grid[i][j].get_text().rstrip("%")) / 100, 6)
            row.append(name_and_value + [p])
        result.append(row)

    return result


def extract_value_from_option(option: str):
    pattern = r"\d+"
    split_option = option.split("(")
    nums_in_name = re.findall(pattern, split_option[0])
    value = int(nums_in_name[-1]) if nums_in_name else 0
    split_option[0] = split_option[0][::-1].replace(str(value)[::-1], "n", 1)[::-1] if nums_in_name else split_option[0]
    return ["(".join(split_option), value]


if __name__ == "__main__":
    main()
