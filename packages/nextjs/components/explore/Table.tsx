import React from "react";
import Link from "next/link";

const Table = ({ data }: { data: any[] }) => {
  // const [propData, setPropData] = useState<any[]>();
  // useEffect(() => {
  //   setPropData(data)
  //   console.log("DATA PROPS", data)
  // }, [data]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 text-primary">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b font-semibold">Address</th>
            <th className="py-3 px-4 border-b font-semibold">Cid</th>
            <th className="py-3 px-4 border-b font-semibold">TokenId</th>
            <th className="py-3 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {data?.map(item => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{item.speaker}</td>
              <td className="py-2 px-4 border-b">{item.cId}</td>
              <td className="py-2 px-4 border-b">{item.tokenId.toString()}</td>
              <td className="py-2 px-4 border-b">
                <Link href={`/generate?address=${item.speaker}&cid=${item.cId}&tokenId=${item.tokenId.toString()}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Generate
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
