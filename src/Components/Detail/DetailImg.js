const DetailImg = ({ content, subImgDataList }) => {
  const paragraphs = content
    .split("\n")
    .map((paragraph, index) => <div key={index}>{paragraph}</div>);
  return (
    <div className="DetailImg">
      <div className="content">{paragraphs}</div>
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
          <p>이미지가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default DetailImg;
