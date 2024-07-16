import React from "react";
import "../styles/ImgSlide.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

class ImgSlide extends React.Component {
  constructor() {
    super();
    this.state = {
      imageCurrentNo: 0,
    };
  }

  onChangeImage = (index) => {
    if (this.props.mainImgDataList.length <= index) index = 0;
    if (index < 0) index = this.props.mainImgDataList.length - 1;

    this.setState({ imageCurrentNo: index });
  };

  render() {
    const { mainImgDataList } = this.props;
    return (
      <div className="imageSlide">
        <div className="navBox">
          <span>{this.state.imageCurrentNo + 1}</span>
          <span>/</span>
          <span>{mainImgDataList && mainImgDataList.length}</span>
        </div>
        <div className="slideBox">
          <div
            className="slideList"
            style={{
              transform: `translate3d(
                ${this.state.imageCurrentNo * -500}px, 0px, 0px`,
            }}
          >
            {mainImgDataList?.map((imageData, no) => (
              <div className="slideContent" key={no}>
                <picture>
                  <img src={imageData.fileUrl} alt={`slide-${no}`} />
                </picture>
              </div>
            ))}
          </div>

          <div
            className="buttonPrev"
            onClick={() => this.onChangeImage(this.state.imageCurrentNo - 1)}
          >
            <IoIosArrowBack />
          </div>
          <div
            className="buttonNext"
            onClick={() => this.onChangeImage(this.state.imageCurrentNo + 1)}
          >
            <IoIosArrowForward />
          </div>
        </div>
        <div className="paginationBox">
          {mainImgDataList?.map((imageData, no) => (
            <div
              key={no}
              onClick={() => {
                this.onChangeImage(no);
              }}
            >
              <picture>
                <img src={imageData.fileUrl} alt={`thumbnail-${no}`} />
              </picture>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ImgSlide;
