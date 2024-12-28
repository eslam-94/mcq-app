import { fetchRecordFromDb } from "@/lib/db"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  const id = (await params).id

  const result = await fetchRecordFromDb(id)

    if (!result) return <p className="my-2 text-center text-lg bg-white">database error or check your link</p>;

    const {
        questionsNo,
        right,
        wrong,
        skipped
    } = result

    return (
      <div className="max-w-[600px] mx-auto p-5 flex flex-col items-center justify-center">
        <table className="w-full lg:text-4xl">
          <thead>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Label
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Right Answer
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {right}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Wrong Answer
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {wrong}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Skipped Questions
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {skipped}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Score Percentage
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {Math.round(right / questionsNo * 100)} %
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  