//tao 1 list of object person gam 3 phan tu:id name va age 
//hiển thị danh sách nguoi dung trong component people ra dạng danh sach 
//co danh số thứ tự 
function People() {
  const people = [
    { id: 1, name: 'Nguyễn Văn A', age: 50 },
    { id: 2, name: 'Trần Thị B', age: 9 },
    { id: 3, name: 'Lê Văn C', age: 40 },
    { id: 4, name: 'Phạm Minh D', age: 19 },
    { id: 5, name: 'Hoàng Thị E', age: 16 },
    { id: 6, name: 'Vũ Văn F', age: 19 },
    { id: 7, name: 'Đặng Thị G', age: 23 },
    { id: 8, name: 'Bùi Văn H', age: 20 },
    { id: 9, name: 'Ngô Thị I', age: 24 },
    { id: 10, name: 'Lý Văn K', age: 22 }
  ];

  // Logic 1: Tìm người đầu tiên là teenager (10-20 tuổi)
  const firstTeen = people.find(p => p.age >= 10 && p.age <= 20);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* PHẦN 1: HIỂN THỊ DANH SÁCH ĐẦY ĐỦ */}
      <h2>1. Danh sách tất cả người dùng</h2>
      <ol>
        {people.map((person) => (
          <li key={person.id} style={{ marginBottom: '5px' }}>
            {person.name} - {person.age} tuổi
          </li>
        ))}
      </ol>

      <hr />

      {/* PHẦN 2: HIỂN THỊ KẾT QUẢ TÌM KIẾM */}
      <h2>2. Tìm Teenager đầu tiên</h2>
      <div style={{
        padding: '10px',
        border: '1px solid',
        borderColor: firstTeen ? '#b3d7ff' : '#ffb3b3',
        backgroundColor: firstTeen ? '#e7f3ff' : '#ffe7e7',
        borderRadius: '5px',
        width: 'fit-content'
      }}>
        {firstTeen ? (
          <p>
            Tìm thấy: <strong>{firstTeen.name}</strong> ({firstTeen.age} tuổi) - ID: {firstTeen.id}
          </p>
        ) : (
          <p style={{ color: 'red', fontWeight: 'bold' }}>No result</p>
        )}
      </div>
    </div>
  );
}

export default People;

