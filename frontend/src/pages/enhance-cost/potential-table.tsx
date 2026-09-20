const TABLE_ROW_COUNT = 4;

export function PotentialTable() {
  return (
    <table className="border-collapse w-full text-xs">
      <thead>
        <tr className="border-b">
          <th className="border-r px-3 py-1 text-left font-medium text-muted-foreground">옵션</th>
          <th className="px-3 py-1 text-left font-medium text-muted-foreground">평균값</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: TABLE_ROW_COUNT }).map((_, index) => (
          <tr key={index} className="border-b last:border-b-0">
            <td className="border-r px-3 py-1">&nbsp;</td>
            <td className="px-3 py-1">&nbsp;</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
