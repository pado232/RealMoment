const DetailImg = ({ content, subImgDataList }) => {
  return (
    <div className="DetailImg">
      <h2>상세 설명</h2>
      {/* <table>
          <colgroup style={{ width: 120 }} />
          <colgroup style={{ width: 1000 }} />
          <tbody>
            <tr>
              <th>상품명</th>
              <td>
                {립스틱}
              </td>
            </tr>
            <tr>
              <th>상품 설명</th>
              <td>
                {content}
              </td>
            </tr>
            <tr>
              <th>유통기한</th>
              <td>
                {상품}
              </td>
            </tr>
          </tbody>
        </table> */}
      <div>{content}</div>
      <div className="imgs">
        {subImgDataList && subImgDataList.length > 0 ? (
          subImgDataList.map((imgData) => (
            <div>
              <img
                key={imgData.s3FileId}
                src={imgData.fileUrl}
                alt={imgData.fileName}
                className="detail-img"
              />
            </div>
          ))
        ) : (
          <p>이미지가 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default DetailImg;
