from time import sleep
from clicknium import clicknium as cc, locator

grade = [locator.nexon.maplestory.grade.rare,
         locator.nexon.maplestory.grade.epic,
         locator.nexon.maplestory.grade.unique,
         locator.nexon.maplestory.grade.legendary]

part = [locator.nexon.maplestory.part.weapon,
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
    tab = cc.chrome.open("https://maplestory.nexon.com/Guide/OtherProbability/cube/black")
    tab.find_element(locator.nexon.maplestory.grade.select).click()
    tab.find_element(grade[0]).click()
    tab.find_element(locator.nexon.maplestory.part.select).click()
    tab.find_element(part[0]).click()
    tab.find_element(locator.nexon.maplestory.level.input).set_text("0")
    tab.find_element(locator.nexon.maplestory.search.button).click()
    sleep(10)
    tab.close()

if __name__ == "__main__":
    main()
