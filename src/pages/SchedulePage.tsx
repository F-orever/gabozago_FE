import PageTemplate from "../components/common/PageTemplate";
import Heading from "../components/common/Heading";
import ScheduleCard from "../components/schedule/ScheduleCard";
import CirclePlusIcon from "../assets/icons/circlePlus.svg?react";

import * as S from "../styles/pages/SchedulePage.style";

function SchedulePage() {
    return (
        <PageTemplate nav={true} header={false}>
            <div style={{ padding: "20px" }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                    }}
                >
                    <Heading size="md">최민석 님</Heading>
                    <Heading
                        size="md"
                        //style={{ textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                    >
                        아직 여행 일정이 없어요
                    </Heading>
                </div>
                <ScheduleCard
                    imgURL="abc"
                    heading="제목"
                    content="본문"
                    currentBookMarked={true}
                />
                <S.FloatingBtnWrapper>
                    <CirclePlusIcon />
                </S.FloatingBtnWrapper>
            </div>
        </PageTemplate>
    );
}

export default SchedulePage;