type Props = {
  comments: Comment[];
};

const DataTable = ({ comments }: Props) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="table-auto border-collapse text-left text-xs sm:text-sm w-full text-primary">
        <thead className="h-12 bg-gray-300">
          <tr>
            <th className="py-2 px-6 w-24">Post ID</th>
            <th className="py-2 px-6">Name</th>
            <th className="py-2 px-6">Email</th>
            <th className="py-2 px-6">Comment</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((item: Comment) => (
            <tr key={item.id}>
              <td className="py-2 px-6">{item.postId}</td>
              <td className="py-2 px-6">{item.name}</td>
              <td className="py-2 px-6">{item.email}</td>
              <td className="py-2 px-6">{item.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
