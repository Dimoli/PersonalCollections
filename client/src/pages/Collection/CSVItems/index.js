import React, { useMemo } from "react";
import { CSVLink } from "react-csv";

export default (props) => {
  const { basicFieldsEntries, additionalFieldsEntries, data } = props;
  const headers = useMemo(
    () =>
      [
        ...basicFieldsEntries.map((field) => ({
          label: field[1],
          key: field[1],
        })),
        ...additionalFieldsEntries.reduce(
          (acc, fields) => (
            (acc = [
              ...acc,
              ...fields[1].reduce(
                (acc, field) => (
                  acc.push({ label: field.toString(), key: field.toString() }),
                  acc
                ),
                []
              ),
            ]),
            acc
          ),
          []
        ),
      ] || [],
    [basicFieldsEntries, additionalFieldsEntries]
  );
  const dataCSV = data.map((item) => ({ ...item[0], ...item[1] }));

  return (
    <CSVLink
      data-placement="top"
      title="CSV file with items"
      headers={headers}
      data={dataCSV}
      filename={"my-file.csv"}
      className="btn btn-lg h-75 bg-info text-white m-2"
      target="_blank"
    >
      Export CSV
    </CSVLink>
  );
};
