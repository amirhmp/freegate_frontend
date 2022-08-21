import React, { CSSProperties } from "react";

interface TableRow {
  label: string;
  path?: Array<string> | undefined;
  spanDependsOn?: string[] | undefined;
  extractor: (item: any) => string | number | React.ReactNode;
  style?: CSSProperties | undefined;
}

export type TableSchema = Array<TableRow>;

interface IProps {
  data: any;
  schema: TableSchema;
  separatorStyle?: CSSProperties | undefined;
  tableStyle?: CSSProperties | undefined;
  className?: string | undefined;
  reverse?: boolean;
}

/* First turn structure into a flat structure then instead of nested for loops we can  iterate over all items with only 2 for loops
  but we should save index of virtual nested for loops inside a variable(indices) to know we to render each colItem
*/
const NestedTable: React.FC<IProps> = ({
  data,
  schema,
  separatorStyle,
  tableStyle,
  className,
  reverse = false,
}) => {
  let indexOfColWithMaxRows = 0;
  let maxRowsCount = 0; //index of col with maximum number of rows
  const indices: number[] = []; //index of each item in flattedLists
  const colNextRenderIndex: number[] = [];
  let maxSpan = 0;

  if (reverse) schema.reverse();

  console.log(schema);

  const colsFlattedData = schema.map((col, i) => {
    indices.push(0);
    colNextRenderIndex.push(0);
    const flatted = !col.path ? data as any[] : flatNestedArray(data, ...col.path);
    if (flatted.length > maxRowsCount) {
      maxRowsCount = flatted.length;
      indexOfColWithMaxRows = i;
    }
    return flatted;
  });

  const calcColNextRenderIndex = (col: number, colItem: any) => {
    const spanDependsOn = schema[col].spanDependsOn;
    if (!spanDependsOn) return 1;
    return nestedArrayLengthRecursive(colItem, ...spanDependsOn!);
  };

  return (
    <table className={className} style={tableStyle}>
      <thead>
        <tr>
          {schema.map((item, i) => (
            <th key={`th${i}`}>{item.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {colsFlattedData[indexOfColWithMaxRows].map((_, row) => {
          return (
            <tr key={`tr${row}`}>
              {colsFlattedData.map((flattedCol, col) => {
                if (row !== colNextRenderIndex[col]) return null;

                const cellIndex = indices[col];
                const cellData = flattedCol[cellIndex];

                const nextRenderIndexOffset = calcColNextRenderIndex(
                  col,
                  cellData
                ); //this is actually the needed rowSpan
                colNextRenderIndex[col] += nextRenderIndexOffset;
                ++indices[col];

                if (colNextRenderIndex[col] > maxSpan)
                  maxSpan = colNextRenderIndex[col];
                let mStyle =
                  colNextRenderIndex[col] === maxSpan ? separatorStyle : {};

                if (schema[col].style) {
                  mStyle = {
                    ...schema[col].style,
                    ...mStyle,
                  };
                }
                return (
                  <td
                    key={`${row}${col}`}
                    rowSpan={nextRenderIndexOffset}
                    style={mStyle}
                  >
                    {schema[col].extractor(cellData)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default NestedTable;

function nestedArrayLengthRecursive(obj: any, ...paths: string[]): number {
  const currentArray = obj[paths[0]];
  if (!Array.isArray(currentArray))
    throw Error(
      `path:${paths[0]} does not specify an array!, obj => ${currentArray}`
    );

  if (paths.length === 1) return currentArray.length;

  let sum = 0;
  currentArray.forEach((item) => {
    const result = nestedArrayLengthRecursive(item, ...paths.slice(1));
    sum += result;
  });
  return sum;
}

function flatNestedArray<T = any>(obj: any, ...paths: string[]): Array<T> {
  let flatted = obj[paths[0]];
  for (let i = 1; i < paths.length; i++) {
    const path = paths[i];
    let array: any[] = [];
    for (let j = 0; j < flatted.length; j++) {
      let innerArray = [];
      innerArray = flatted[j][path]; //ex: books[j]['publishes']  //this is an array so we flat this
      array.push(...innerArray);
    }
    flatted = array;
  }
  return flatted;
}
