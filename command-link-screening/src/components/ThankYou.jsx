import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
//  background-color: rgb(68, 85, 111);
//    color: #8ed8f8;
const ThankYouWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  text-align: left;
  border: 1px solid white;
  padding: 20px;

  max-width: 1000px;
  overflow: hidden;
  margin: 0 auto;
  overflow-wrap: break-word;
  background-color: #4c007d;
  border-radius: 16px;
  margin-bottom: 50px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
`;

const ThankYouHeading = styled.h1`
  align-self: center;
  text-align: center;
  margin-bottom: 40px;
  overflow-wrap: break-word;
  white-space: normal;
  font-size: 32px;
  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

const UserDataList = styled.ul`
  display: flex;
  list-style: none;
  border: 2px solid white;
  border-radius: 8px;
  padding: 0;
  overflow-wrap: break-word;
`;

const commonListItemStyles = `
  font-size: 16px;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
`;

const UserDataItem = styled.li`
  ${commonListItemStyles}
  display:flex;
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: rgb(68, 85, 111);
  width: 100%;
  color: #8ed8f8;
  @media (max-width: 500px) {
    flex-direction: column;
  }

  @media (max-width: 300px) {
    flex-direction: column;
  }
`;

const UserDataArrayItem = styled.li`
  ${commonListItemStyles}
  text-align: left;
  align-self: flex-start;
  text-overflow: ellipsis;
  height: 100%;
  overflow: hidden;
  min-height: 100%;
  background-color: rgb(68, 85, 111);
  overflow-wrap: break-word;
  width: 100%;
  border: ${(props) => (props.index === 0 ? "none" : "1px solid white")};
  color: #8ed8f8;
  @media (max-width: 500px) {
    flex-direction: column;
  }

  @media (max-width: 300px) {
    flex-direction: column;
  }
`;
const glowAnimation = keyframes`
  0%, to {
    color: #c8ff00;
    text-shadow: 0 0 12px #009d71, 0 0 50px #009d71, 0 0 100px #009d71;
  }
  `;
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-self: flex-start;
  width: 100%;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
`;

const Value = styled.span`
  display: flex;
  white-space: normal;
  text-overflow: string;
  float: left;
  overflow-wrap: break-word;
  text-align: left;
  width: 90%;
  font-size:20px;
  padding: 5px;
  overflow-x: scroll; 
  overflow-y: hidden;
  height: 100%;

  scrollbar-width: thin;
  scrollbar-color: #ccc #f0f0f0;
  -webkit-overflow-scrolling: touch;
  @media (max-width: 500px) {
    text-align: left;
    width: 95%;
    height: 100%;
    font-size:16px;
  }
  @media (max-width: 300px) {
    text-align: left;
    width: 95%;
    height: 100%;
    font-size:14px;
  }
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc; 
    border-radius: 5px;

  &::-webkit-scrollbar-thumb:hover {
    background-color: #999; 
  }

`;

const IdField = styled.h4`
  white-space: normal;
  overflow-wrap: break-word;
  margin: 0;
  padding-left: 10px;
  font-size: 24px;
  width: 100%-10px;
  font-weight: 700;
  @media (max-width: 500px) {
    text-align: left;
    padding-left: 5px;
    font-size: 20px;
  }
  @media (max-width: 300px) {
    text-align: left;
    padding-left: 5px;
    font-size: 16px;
  }
`;

const TitleLetter = styled.span`
  animation: ${glowAnimation} 2s ease-in-out infinite;
  text-shadow: 1px 1px 2px #009d71;
  color: transparent;
`;
const ThankYou = () => {
  const formValues = useSelector((state) => state.form.formValues);
  const userRecord = useSelector((state) => state.form.userRecord);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isValidUserRecord(userRecord)) {
      navigate("/");
    }
  }, [userRecord, navigate]);

  const isValidUserRecord = (record) => {
    const requiredFields = [
      "email",
      "firstname",
      "lastname",
      "address1",
      "city",
      "state",
      "zip",
      "phone",
      "jobtitle",
      "reason",
    ];
    for (const field of requiredFields) {
      if (!record[field]) {
        return false;
      }
    }
    return true;
  };
  const title = Array.from("Registration successful!");
  const renderUserData = () => {
    return formValues.map((fieldGroup, index) => {
      return (
        <UserDataList key={index} aria-labelledby={`userDataList-${index}`}>
          {Array.isArray(fieldGroup) ? (
            <Row>
              {fieldGroup.map((field, fieldIndex) => (
                <UserDataArrayItem
                  key={fieldIndex}
                  index={fieldIndex}
                  length={fieldGroup.length}
                  aria-labelledby={`userDataList-${index}-field-${fieldIndex}`}
                >
                  <IdField>{field?.id && field.id.charAt(0).toUpperCase() + field.id.toLowerCase().slice(1)}:</IdField>
                  <Value aria-labelledby={`userDataList-${index}-field-${fieldIndex}`}>
                    {userRecord[field.id.toLowerCase()]}
                  </Value>
                </UserDataArrayItem>
              ))}
            </Row>
          ) : (
            <UserDataItem aria-labelledby={`userDataList-${index}`}>
              <IdField id={`label-${fieldGroup.id}`}>
                {fieldGroup?.id && fieldGroup.id.charAt(0).toUpperCase() + fieldGroup.id.toLowerCase().slice(1)}:
              </IdField>
              <Value id={`value-${fieldGroup.id}`} aria-labelledby={`userDataList-${index}-field-${index}`}>
                {userRecord[fieldGroup.id.toLowerCase()]}
              </Value>
            </UserDataItem>
          )}
        </UserDataList>
      );
    });
  };

  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <ThankYouWrapper aria-label="Thank you message">
        <ThankYouHeading>
          {title.map((el, index) => (
            <TitleLetter key={index} style={{ animationDelay: `${index * 0.25}s` }}>
              {el}
            </TitleLetter>
          ))}
        </ThankYouHeading>
        {renderUserData()}
      </ThankYouWrapper>
    </div>
  );
};

export default ThankYou;
