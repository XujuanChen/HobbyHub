import { useState } from "react";
import supabase from "../config/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import Loading from "../pages/Loading";

const Card = ({ smoothie }) => {
  const navigate = useNavigate();
  const user = useUser();
  const [count, setCount] = useState(smoothie.rating);
  const [loading, setLoading] = useState(false);
  let datetime =
    smoothie.created_at.substring(0, 10) +
    " " +
    smoothie.created_at.substring(11, 19);
  const getDate = () => {
    let time = Date.parse(smoothie.created_at);
    let date = new Date(time);
    return (
      date.getMonth() +
      "/" +
      date.getDay() +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes()
    );
  };

  const updateCount = async (event) => {
    setLoading(true);
    event.preventDefault();
    // Update in Supabase
    const { data, error } = await supabase
      .from("recipes")
      .update({ rating: count + 1 })
      .eq("id", smoothie.id)
      .select();
    // Update State Variable
    if (data) {
      setCount((count) => count + 1);
      setLoading(false);
    } else {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="smoothie-card">
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <p> {datetime} </p>
          {/* <p> { getDate() } </p> */}
          <Link to={"/details/" + smoothie.id} className="title-link">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
          </Link>
        </>
      )}
      <div className="rating" onClick={updateCount}>
        👍️{count}
      </div>
      {user.id === smoothie.author ? (
        <div className="buttons">
          <Link to={"/edit/" + smoothie.id}>
            <i className="material-icons">edit</i>
          </Link>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Card;
