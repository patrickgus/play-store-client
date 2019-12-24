import React from "react";
import "./GoogleApp.css";

export default function GoogleApp(props) {
  return (
    <div className="GoogleApp">
      <h2>{props.App}</h2>
      <div className="rating">Rating: {props.Rating}</div>
      <div className="reviews">Out of {props.Reviews} reviews</div>
      <div className="size">Size: {props.Size}</div>
      <div className="content_rating">Rated for {props["Content Rating"]}</div>
      <div className="genre">Genre: {props.Genres}</div>
    </div>
  )
}