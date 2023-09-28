import { useDispatch, useSelector } from "react-redux";

const ThankYou = () => {
  const userRecord = useSelector((state) => state.form.userRecord);
  const dispatch = useDispatch();

  return <div>ThankYou For registering!</div>;
};

export default ThankYou;
