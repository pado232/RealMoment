const hideSensitiveInfo = (profile) => {
  const hiddenInfo = { ...profile };

  // 아이디의 가운데 5자리를 *로 숨김
  if (profile.loginId) {
    const idLength = profile.loginId.length;
    const maskedId =
      profile.loginId.substring(0, idLength / 2 - 1) +
      "*".repeat(4) +
      profile.loginId.substring(idLength / 2 + 3);
    hiddenInfo.loginId = maskedId;
  }

  // 이름을 숨김
  if (profile.name) {
    const nameLength = profile.name.length;
    if (nameLength === 2) {
      hiddenInfo.name =
        profile.name.substring(0, 1) + "*" + profile.name.substring(1);
    } else if (nameLength % 2 === 1) {
      const middleIndex = Math.floor(nameLength / 2);
      hiddenInfo.name =
        profile.name.substring(0, middleIndex) +
        "*" +
        profile.name.substring(middleIndex + 1);
    } else {
      const middleIndex = nameLength / 2;
      hiddenInfo.name =
        profile.name.substring(0, middleIndex - 1) +
        "**" +
        profile.name.substring(middleIndex + 1);
    }
  }

  // 이메일 절반을 *로 숨김
  if (profile.email) {
    const atIndex = profile.email.indexOf("@");
    if (atIndex !== -1) {
      const beforeAt = profile.email.substring(0, atIndex);
      const afterAt = profile.email.substring(atIndex);

      // beforeAt의 절반을 가림
      const maskLength = Math.ceil(beforeAt.length / 2);
      const maskedEmail =
        beforeAt.substring(0, beforeAt.length - maskLength) +
        "*".repeat(maskLength) +
        afterAt;

      hiddenInfo.email = maskedEmail;
    }
  }

  // 생년월일을 숨김
  if (profile.birthDate) {
    const birthParts = profile.birthDate.split("-");
    if (birthParts.length === 3) {
      const year = birthParts[0];
      const month = birthParts[1];
      const day = birthParts[2];
      const hiddenMonth = "*".repeat(month.length);
      const hiddenDay = "*".repeat(day.length);
      hiddenInfo.birthDate = `${year}년 ${hiddenMonth}월 ${hiddenDay}일`;
    }
  }

  // 가입일을 한국어 형식으로 변환
  if (profile.createdDate) {
    const createdDateParts = new Date(profile.createdDate)
      .toISOString()
      .split("T")[0];
    const hangulDate = createdDateParts.split("-");
    const year = hangulDate[0];
    const month = hangulDate[1];
    const day = hangulDate[2];
    hiddenInfo.createdDate = `${year}년 ${month}월 ${day}일`;
  }

  return hiddenInfo;
};

export default hideSensitiveInfo;
