import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = title + " | Real Moment";
  }, [title]);
};
export default usePageTitle;
