import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxExit } from "react-icons/rx";
import { BsFillPinAngleFill } from "react-icons/bs";

import DateFormatVer2 from "../../util/DateFormatVer2";
import Container from "../../util/Container";
import axiosInstance from "../../api/AxiosInstance";

const AnnouncementDetail = () => {
  const { announcementId } = useParams();
  const navigate = useNavigate();
  const [announcement, setAnnouncement] = useState([]);

  const fetchAnnouncement = () => {
    axiosInstance
      .get(`/announcement?announcementId=${announcementId}`)
      .then((res) => {
        const announcementData = res.data;

        setAnnouncement(announcementData);
        console.log("fetchAnnouncement GET", res);
      })
      .catch((error) => {
        console.log("fetchAnnouncement Error", error);
      });
  };

  useEffect(() => {
    fetchAnnouncement();
  }, [announcementId]);

  return (
    <div className="AnnouncementDetail">
      <Container>
        <div className="icon_container">
          <h2>Announcement</h2>
          <div className="btn">
            <RxExit
              className="exit_icon"
              size={30}
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
        </div>

        <div className="DetailContainer">
          {announcement && (
            <div className="title_box">
              {announcement.fix ? (
                <div>
                  <BsFillPinAngleFill size={22} />
                </div>
              ) : (
                ""
              )}
              <div className="title">{announcement.title}</div>
            </div>
          )}

          <div>
            {announcement && (
              <table>
                <colgroup>
                  {/* <col style={{ width: 200 }} />
                  <col style={{ width: 200 }} />
                  <col style={{ width: 200 }} /> */}
                </colgroup>
                <tbody>
                  <tr>
                    <th>공지사항 번호</th>
                    <td>{announcement.announcementId}</td>
                    <th>조회수</th>
                    <td>{announcement.viewCount}</td>
                  </tr>
                  <tr>
                    <th>작성 날짜</th>
                    <td>
                      <DateFormatVer2 dateString={announcement.createdDate} />
                    </td>

                    <th>수정 날짜</th>
                    <td>
                      <DateFormatVer2
                        dateString={announcement.lastModifiedDate}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            {announcement && (
              <div className="content">{announcement.content}</div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AnnouncementDetail;
