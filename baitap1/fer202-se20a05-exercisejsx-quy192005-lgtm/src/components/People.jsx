//Tạo 1 list of object Person gồm 3 phần tử: id, name, age.
//Hiển thị danh sách người dùng trong component People ra dạng danh sách
//có đánh số thứ tự, tên và tuổi của người dùng.
function People() {
  // 1. Khởi tạo danh sách 10 người
  const people = [
    { id: 1, name: 'Nguyễn Văn A', age: 50 },
    { id: 2, name: 'Trần Thị B', age: 9 },
    { id: 3, name: 'Lê Văn C', age: 40 },
    { id: 4, name: 'Phạm Minh D', age: 19 },
    { id: 5, name: 'Hoàng Thị E', age: 16 },
    { id: 6, name: 'An Văn F', age: 19 }, 
    { id: 7, name: 'Đặng Thị G', age: 23 },
    { id: 8, name: 'Bùi Văn H', age: 20 },
    { id: 9, name: 'Ngô Thị I', age: 24 },
    { id: 10, name: 'Lý Văn K', age: 22 }
  ];

  // 2. Tìm teenager đầu tiên (tuổi từ 10 đến 20)
  const firstTeen = people.find(p => p.age >= 10 && p.age <= 20);

  // 3. Sắp xếp: Tuổi tăng dần -> Tên tăng dần
  const sortedPeople = [...people].sort((a, b) => {
    if (a.age !== b.age) {
      return a.age - b.age; // Ưu tiên xếp theo tuổi
    }
    return a.name.localeCompare(b.name); // Nếu bằng tuổi thì xếp theo tên
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* HIỂN THỊ KẾT QUẢ TÌM KIẾM TEENAGER */}
      <h2>Kết quả tìm Teenager đầu tiên</h2>
      <div style={{
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid',
        borderColor: firstTeen ? '#b3d7ff' : '#ffb3b3',
        backgroundColor: firstTeen ? '#e7f3ff' : '#ffe7e7',
        borderRadius: '5px',
        width: 'fit-content'
      }}>
        {firstTeen ? (
          <p>Tìm thấy: <strong>{firstTeen.name}</strong> - {firstTeen.age} tuổi (ID: {firstTeen.id})</p>
        ) : (
          <p style={{ color: 'red', fontWeight: 'bold' }}>No result</p>
        )}
      </div>

      <hr />

      {/* HIỂN THỊ BẢNG DANH SÁCH ĐÃ SẮP XẾP */}
      <h2>Danh sách người dùng (Sắp xếp theo Tuổi & Tên)</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={{ padding: '10px' }}>ID</th>
            <th style={{ padding: '10px' }}>Name</th>
            <th style={{ padding: '10px' }}>Age</th>
          </tr>
        </thead>
        <tbody>
          {sortedPeople.map((person) => (
            <tr key={person.id}>
              <td style={{ padding: '10px' }}>{person.id}</td>
              <td style={{ padding: '10px' }}>{person.name}</td>
              <td style={{ padding: '10px' }}>{person.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default People;