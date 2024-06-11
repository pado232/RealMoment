const InquiryLookBox = ({ itemTitle, itemContent, itemCommnetContent }) => {
  // itemContent가 존재하지 않거나 빈 문자열인 경우 기본값 처리
  const content = itemContent || "";
  const commentContent =
    itemCommnetContent ||
    "죄송합니다.\n 아직 답변이 오지 않았어요.\n 빠른 시일 내에 답변해드리겠습니다!🙇‍♀️ ";

  // \n이 있는 경우와 없는 경우를 모두 처리
  const paragraphs = content.includes("\n")
    ? content
        .split("\n")
        .map((paragraph, index) => <div key={index}>{paragraph}</div>)
    : [<div key={0}>{content}</div>];

  const paragraphsComment = commentContent.includes("\n")
    ? commentContent
        .split("\n")
        .map((paragraph, index) => <div key={index}>{paragraph}</div>)
    : [<div key={0}>{commentContent}</div>];

  return (
    <div className="ReviewLookBox">
      <div className="review_write_box" style={{ margin: 50, width: 500 }}>
        <h2>나의 문의</h2>

        <div className="content_warpper">
          <div className="title">{itemTitle}</div>
          <div className="content">
            <div>{paragraphs}</div>
          </div>
        </div>

        <div className="content_warpper">
          <div className="title">문의에 대한 답변</div>
          <div className="content">
            <div>{commentContent && <div>{paragraphsComment}</div>}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InquiryLookBox;
