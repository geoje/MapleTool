export default abstract class DateUtil {
  static isYesterday({ date }: { date: string }): boolean {
    if (!date) return false;

    const characterDate = new Date(Date.parse(date));
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    return (
      characterDate.setHours(0, 0, 0, 0) == yesterdayDate.setHours(0, 0, 0, 0)
    );
  }
  static compare(dateA: string, dateB: string): number {
    const parsedDateA = new Date(Date.parse(dateA));
    const parsedDateB = new Date(Date.parse(dateB));
    return parsedDateA.getTime() - parsedDateB.getTime();
  }
}
