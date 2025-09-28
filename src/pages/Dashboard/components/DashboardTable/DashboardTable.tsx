import { useCallback, useMemo, useState } from "react";

import images from "../../../../assets/img";
import "./DashboardTable.scss";
import DoubleColorBar from "../../../../components/DoubleColorBarProps";
import type { Server } from "../../../../store/types/serversTypes";
import { useAppSelector } from "../../../../store/hooks/useAppSelector";

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
};

const icons = {
  important: images.important,
  "all good": images.allGood,
  moderate: images.moderate,
  critical: images.critical,
};

const getValue = (item: Server, key: string) => {
  if (key === "cpu") return item.cpu.used;
  if (key === "memory") return item.memory.used;
  return item[key as keyof Server];
};

const DashboardTable = () => {
  const dataRedux = useAppSelector((state) => state.servers.list ?? []);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const sortedData = useMemo(() => {
    return [...dataRedux].sort((a, b) => {
      if (!sortConfig) return 0;

      const { key, direction } = sortConfig;

      const aVal = getValue(a, key);
      const bVal = getValue(b, key);

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [dataRedux, sortConfig]);

  const requestSort = useCallback(
    (key: keyof Server, direction: "asc" | "desc" = "asc") => {
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "asc"
      ) {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    },
    [sortConfig]
  );

  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__row">
          <th className="table__cell table__cell-head">ID</th>
          <th
            className="table__cell table__cell-head table__cell-sortable"
            onClick={() => requestSort("state")}
          >
            State <img src={images.sort} alt="sort" />
          </th>
          <th className="table__cell table__cell-head">Host server</th>
          <th
            className="table__cell table__cell-head table__cell-sortable"
            onClick={() => requestSort("cpu")}
          >
            CPU <img src={images.sort} alt="sort" />
          </th>
          <th
            className="table__cell table__cell-head table__cell-sortable"
            onClick={() => requestSort("memory")}
          >
            Memory <img src={images.sort} alt="sort" />
          </th>
          <th
            className="table__cell table__cell-head table__cell-sortable"
            onClick={() => requestSort("uptime")}
          >
            Uptime <img src={images.sort} alt="sort" />
          </th>
          <th className="table__cell table__cell-head">Alerts</th>
        </tr>
      </thead>
      <tbody className="table__body">
        {sortedData.map((row, i) => (
          <tr key={i} className="table__row">
            <td className="table__cell">{row.id}</td>
            <td className={"table__cell"}>
              <span
                className={
                  "table__cell-state table__cell-state--" +
                  row.state.toLowerCase()
                }
              >
                {row.state}
              </span>
            </td>
            <td className="table__cell">{row.host}</td>
            <td className="table__cell">
              {row.cpu.used}
              <DoubleColorBar
                firstValue={row.cpu.used}
                secondValue={row.cpu.total}
                firstColor="#5f3196"
                secondColor="#f9fafb"
              />
            </td>
            <td className="table__cell">
              {row.memory.used}
              <DoubleColorBar
                firstValue={row.memory.used}
                secondValue={row.memory.total}
                firstColor="#5f3196"
                secondColor="#f9fafb"
              />
            </td>
            <td className="table__cell">{row.uptime}</td>
            <td className="table__cell table__cell-type">
              <img src={icons[row.alert.type]} alt={row.alert.type} />
              <b>{row.alert.count}</b>

              {row.alert.type}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DashboardTable;
