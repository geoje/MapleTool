import re
import json
from time import sleep
from clicknium import clicknium as cc, locator
from clicknium.core.models.web.browsertab import BrowserTab

levels = [0, 10, 11, 20, 21, 30, 31, 40, 41, 50, 51, 60, 61, 70, 71, 80, 81, 90, 91,
         100, 101, 110, 111, 120, 201]

grades = [locator.nexon.maplestory.grade.rare,
         locator.nexon.maplestory.grade.epic,
         locator.nexon.maplestory.grade.unique,
         locator.nexon.maplestory.grade.legendary]

parts = [locator.nexon.maplestory.part.weapon,
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

data = {}

def main():
    tab = cc.chrome.open("https://maplestory.nexon.com/Guide/OtherProbability/cube/black", False)
    print(crawlData(tab, parts[0], grades[0], levels[0]))
    
    # for part in parts:
    #     for level in levels:
    #         for grade in grade:
    #             crawlData(tab, part, grade, level)
    
    tab.close()

def crawlData(tab: BrowserTab, part: str, grade: str, level: str) -> list:
    tab.find_element(locator.nexon.maplestory.grade.select).click()
    tab.find_element(grade).click()
    tab.find_element(locator.nexon.maplestory.part.select).click()
    tab.find_element(part).click()
    tab.find_element(locator.nexon.maplestory.level.input).set_text(level)
    tab.find_element(locator.nexon.maplestory.search.button).click()
    sleep(1)
    
    nameGrid = [
        tab.find_elements(locator.nexon.maplestory.option.name1),
        tab.find_elements(locator.nexon.maplestory.option.name2),
        tab.find_elements(locator.nexon.maplestory.option.name3)]
    probabilityGrid = [
        tab.find_elements(locator.nexon.maplestory.option.probability1),
        tab.find_elements(locator.nexon.maplestory.option.probability2),
        tab.find_elements(locator.nexon.maplestory.option.probability3)]
    
    pattern = r"\d+"
    result = []
    for i in range(len(nameGrid)):
        row = []
        for j in range(len(nameGrid[0])):
            name = nameGrid[i][j].get_text()
            value = int(re.findall(pattern, name)[-1])
            name = name[::-1].replace(str(value)[::-1], "n", 1)[::-1]
            p = round(float(probabilityGrid[i][j].get_text().rstrip("%")) / 100, 6)
            row.append([name, value, p])
        result.append(row)

    return result

if __name__ == "__main__":
    main()
