import React from "react";
import styled from "styled-components";
import { Button, ProgressBar } from "react-bootstrap";
import { createSearchParams, useNavigate } from "react-router-dom";
import { QuestionData } from "../assets/data/questiondata";

const Question = () => {

  const [questionNo, setQuestionNo]=React.useState(0);
  const [totalScore, setTotalScore]=React.useState([
    {id:"EI", score:0},{id:"SN", score:0},{id:"TF", score:0},
    {id:"JP", score:0}]);
  const navigate=useNavigate();

  const handleClickButton=(no,type)=>{
    const newScore=totalScore.map((s)=>
      s.id===type ? {id:s.id,score:s.score+no} : s
    )
    setTotalScore(newScore);

    if (QuestionData.length!==questionNo+1) {
      setQuestionNo(questionNo+1);
    } else {
      const mbti=newScore.reduce(
        (acc,curr)=> {
          return acc+(curr.score>=2 ? curr.id.substring(0,1) : curr.id.substring(1,2))
        },""
      );

      navigate({
        pathname: '/result',
        search: `?${createSearchParams({
          mbti: mbti,
        })}`
      });
    }
    
    // if(type==="EI"){
    //   const addScore=totalScore[0].score+no
    //   const newObject={id:"EI",score:addScore}
    //   totalScore.splice(0,1,newObject);
    // } else if (type==="SN") {
    //   const addScore=totalScore[0].score+no
    //   const newObject={id:"SN",score:addScore}
    //   totalScore.splice(1,1,newObject);
    // } else if (type==="TF") {
    //   const addScore=totalScore[0].score+no
    //   const newObject={id:"TF",score:addScore}
    //   totalScore.splice(2,1,newObject);
    // } else {
    //   const addScore=totalScore[0].score+no
    //   const newObject={id:"JP",score:addScore}
    //   totalScore.splice(3,1,newObject);
    // }
    // 이 곳에 navigate할지 setQuestionNo할지 지정하는 if문 작성해도 됨
  }

  return(
    <Wrapper>
      <ProgressBar striped variant="danger" now={(questionNo/QuestionData.length)*100} style={{marginTop:'20px'}} />
      <Title>{QuestionData[questionNo].title}</Title>
      <ButtonGroup>
        <Button onClick={()=>handleClickButton(1,QuestionData[questionNo].type)}
        style={{width:"40%", minHeight: "200px", fontSize:"15pt"}}>
          {QuestionData[questionNo].answera}
        </Button>
        <Button onClick={()=>handleClickButton(0,QuestionData[questionNo].type)}
        style={{width:"40%", minHeight: "200px", fontSize:"15pt", marginLeft:"20px"}}>
          {QuestionData[questionNo].answerb}
        </Button>
      </ButtonGroup>
    </Wrapper>
  )
}

export default Question;

const Wrapper = styled.div`
  height:100vh;   
  width:100%;
`

const Title = styled.div`
  font-size:30pt;
  text-align:center;
  font-family: "DNFBitBitTTF";
`

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: center;
  font-family: "DNFBitBitTTF";
`