import re, json, os.path
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
                partStr = tab.find_element(partLocator).get_text()
                levelStr = str(level)
                gradeStr = tab.find_element(gradeLocator).get_text()

                if partStr not in data:
                    data[partStr] = {}
                if levelStr not in data[partStr]:
                    data[partStr][levelStr] = {}
                if gradeStr in data[partStr][levelStr]:
                    continue

                print([partStr, levelStr, gradeStr])
                data[partStr][levelStr][gradeStr] = crawlData(tab, partLocator, levelStr, gradeLocator)
                with open(FILENAME, 'w', encoding='UTF-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
    
    tab.close()

def crawlData(tab: BrowserTab, partLocator, levelStr, gradeLocator) -> list:
    gradeStr = tab.find_element(gradeLocator).get_text()
    tab.find_element(locator.nexon.maplestory.grade.select).click()
    tab.find_element(gradeLocator).click()
    tab.find_element(locator.nexon.maplestory.part.select).click()
    tab.find_element(partLocator).click()
    tab.find_element(locator.nexon.maplestory.level.input).set_text(levelStr)
    tab.find_element(locator.nexon.maplestory.search.button).click()
    sleep(1)

    for i in range(RETRY_COUNT):
        if (tab.is_existing(locator.nexon.maplestory.option.potential, timeout=1) and
            (tab.find_element(locator.nexon.maplestory.option.potential).get_text() == gradeStr)):
            break
    else:
        return []
    
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
        for j in range(len(nameGrid[i])):
            nameAndValue = extractValueFromOption(nameGrid[i][j].get_text())
            p = round(float(probabilityGrid[i][j].get_text().rstrip("%")) / 100, 6)
            row.append(nameAndValue + [p])
        result.append(row)

    return result

def extractValueFromOption(option: str):
    pattern = r"\d+"
    splitted = option.split("(")
    numsInName = re.findall(pattern, splitted[0])
    value = int(numsInName[-1]) if numsInName else 0
    splitted[0] = splitted[0][::-1].replace(str(value)[::-1], "n", 1)[::-1] if numsInName else splitted[0]
    return ["(".join(splitted), value]

if __name__ == "__main__":
    main()
