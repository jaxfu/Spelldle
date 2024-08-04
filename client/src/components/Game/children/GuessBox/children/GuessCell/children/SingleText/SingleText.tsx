import TextInput from "./children/TextInput/TextInput";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import { useState, useMemo, useContext, useEffect } from "react";
import { type T_CATEGORY_INFO } from "../../../../../../../../methods/categories";
import GuessDataContext from "../../../../../../../../Contexts/GuessDataContext";

interface IProps {
  categoryInfo: T_CATEGORY_INFO;
}

const SingleText: React.FC<IProps> = (props) => {
  const [input, setInput] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [validInput, setValidInput] = useState<boolean>(false);

  const guessData = useContext(GuessDataContext);

  const hasValidInput: boolean = useMemo(() => {
    return props.categoryInfo.values_map.has(input.toLowerCase());
  }, [input]);

  function updateValidInput(hasValidInput: boolean): void {
    if (!validInput && hasValidInput) {
      setValidInput(true);
    }
    if (validInput && !hasValidInput) {
      setValidInput(false);
    }
  }

  function updateGuessCategoriesMap(hasValidInput: boolean): void {
    if (guessData !== null) {
      if (hasValidInput) {
        const valueId = props.categoryInfo.values_map.get(input.toLowerCase());

        if (valueId !== undefined) {
          guessData.current.set(props.categoryInfo.name, valueId);
          console.log("Setting")
        }
      }
    }
  }

  useEffect(() => {
    updateValidInput(hasValidInput);
    updateGuessCategoriesMap(hasValidInput);
  }, [hasValidInput]);

  return (
    <>
      <TextInput
        input={input}
        setInput={setInput}
        show={show}
        setShow={setShow}
        validInput={hasValidInput}
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
