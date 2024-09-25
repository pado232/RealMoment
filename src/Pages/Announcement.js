import { useNavigate } from "react-router-dom";
import Container from "../util/Container";
import Pagination from "../util/Pagination";
import DateFormatVer2 from "../util/DateFormatVer2";
import WhiteButton from "../util/Buttons/WhiteButton";
import { useEffect, useState } from "react";
import axiosInstance from "../api/AxiosInstance";
import { BsFillPinAngleFill } from "react-icons/bs";

import "../styles/Announcement.css";

const Announcement = () => {
  const navigate = useNavigate();
  const [announcementList, setAnnouncementList] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchAnnouncementList = () => {
    axiosInstance
      .get(`/announcementList?nowPage=${nowPage}`)
      .then((res) => {
        const announcementListData = res.data.announcementList;
        const nowPageData = res.data.nowPage;
        const totalPageData = res.data.totalPage;

        setAnnouncementList(announcementListData);
        setNowPage(nowPageData);
        setTotalPage(totalPageData);
        console.log("fetchAnnouncementList GET", res);
      })
      .catch((error) => {
        console.log("fetchAnnouncementList Error", error);
      });
  };

  useEffect(() => {
    fetchAnnouncementList();
  }, [nowPage]); // 페이지 변경에 따라 공지사항 목록을 다시 불러옴

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 상단으로 스크롤
  }, [nowPage]);

  return (
    <div className="Announcement">
      <Container>
        <div>
          <h2>Announcement</h2>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>고정</th>
                  <th>번호</th>
                  <th>제목</th>
                  <th>내용</th>
                  <th>조회수</th>
                  <th>작성 날짜</th>
                </tr>
              </thead>
              <tbody>
                {/* 공지사항이 없을 때 "공지사항이 없습니다" 메시지 표시 */}
                {announcementList.length === 0 ? (
                  <tr>
                    <td
                      colSpan="7"
                      style={{ textAlign: "center", padding: 150 }}
                    >
                      등록된 공지사항이 없습니다.
                    </td>
                  </tr>
                ) : (
                  announcementList.map((announce, index) => (
                    <tr key={index}>
                      <td>
                        {announce.fix.toLocaleString() === "true" ? (
                          <div>
                            <BsFillPinAngleFill />
                          </div>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>{announce.announcementId}</td>

                      <td>
                        <div
                          className="goToDetail"
                          onClick={() =>
                            navigate(`/announcement/${announce.announcementId}`)
                          }
                        >
                          {announce.title}
                        </div>
                      </td>
                      <td>
                        <div
                          className="goToDetail"
                          onClick={() =>
                            navigate(`/announcement/${announce.announcementId}`)
                          }
                        >
                          {announce.content.length > 20
                            ? announce.content.slice(0, 20) + "..."
                            : announce.content}
                        </div>
                      </td>

                      <td>{announce.viewCount}</td>
                      <td>
                        <div className="date">
                          <div>
                            <DateFormatVer2
                              dateString={announce.lastModifiedDate}
                            />
                          </div>
                          {announce.createdDate !==
                          announce.lastModifiedDate ? (
                            <div className="edit">수정</div>
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagination">
          <Pagination
            setNowPage={setNowPage}
            nowPage={nowPage}
            totalPage={totalPage}
          />
        </div>
      </Container>
    </div>
  );
};

export default Announcement;
