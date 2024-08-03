import TextInput from "./children/TextInput/TextInput";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import { useState, useMemo } from "react";
import { type T_CATEGORY_INFO } from "../../../../../../../../methods/categories";

interface IProps {
  categoryInfo: T_CATEGORY_INFO;
}

const SingleText: React.FC<IProps> = (props) => {
  const [input, setInput] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [validInput, setValidInput] = useState<boolean>(false);

  if (props.categoryInfo.values_map.has(input.toLowerCase())) {
    if (!validInput) setValidInput(true);
  } else {
    if (validInput) setValidInput(false);
  }

  return (
    <>
      <TextInput
        input={input}
        setInput={setInput}
        show={show}
        setShow={setShow}
        validInput={validInput}
      />
      {show && (
        <RecommendationBox
          values={props.categoryInfo.values}
          input={input}
          setInput={setInput}
        />
      )}
    </>
  );
};

export default SingleText;
