import React, { useState, useEffect } from "react";
import axios from "axios";
import Styles from "./TodoList.module.css";



function TodoApp1() {
	const [task, setTask] = useState("");
	const [tasklist, setTasklist] = useState([]);
	const [update, setUpdateValue] = useState("");
	const token = Buffer.from(`${"admin"}:${"morgan2d"}`, "utf-8").toString(
		"base64"
	);
	const [rev, setRev] = useState("1-0874c5546415654dde533b77b3bbd4f5");

	const handleChange = (e) => {
		setTask(e.target.value);
	};

	const updateValue = (e) => {
		setUpdateValue(e.target.value);
	};

	useEffect(() => {
		axios
			.get(
				"http://localhost:5984/todolist-1/2ed85ec0fe47a2c775b232a88f047b9c",
				{
					headers: {
						Authorization: `Basic ${token}`,
					},
				}
			)
			.then((response) => {
				console.log(response.data);
				setTasklist(response.data.name);
				setRev(response.data._rev);
				console.log(response.data);
			});

		console.log("I am called : ");
	}, [rev]);

	// taskDetails = ["Ramesh"]
	const addTask = (e) => {
		console.log(tasklist, task);
		const taskDetails = {
			name: [...tasklist, task],
			_rev: rev,
		};

		axios
			.put(
				`http://localhost:5984/todolist-1/2ed85ec0fe47a2c775b232a88f047b9c`,
				taskDetails,
				{
					headers: {
						Authorization: `Basic ${token}`,
					},
				}
			)
			.then((res) => {
				setRev(res.data.rev);
				console.log("The value of response : ", res);
				console.log("Rev is : ", rev);
				console.log(res);
				/* console.log('Tasklist',tasklist); */
			})
			.catch((err) => console.log(err));
	};

	const deleteItem = (index) => {
		tasklist.splice(index, 1);
		setTasklist(tasklist);
		const taskDetails = {
			name: [...tasklist],
			_rev: rev,
		};

		axios
			.put(
				`http://localhost:5984/todolist-1/2ed85ec0fe47a2c775b232a88f047b9c`,
				taskDetails,
				{
					headers: {
						Authorization: `Basic ${token}`,
					},
				}
			)
			.then((res) => {
				setRev(res.data.rev);
				console.log("The value of response : ", res);
				console.log("Rev is : ", rev);
				console.log(res);
				/* console.log('Tasklist',tasklist); */
			})
			.catch((err) => console.log(err));
		console.log("The value of tasklist in the deleteItem is : ", tasklist);

		/* 	setTasklist(items) */
	};
	const updateValueinCouch = (index) => {
		tasklist.splice(index, 1, update);
		setTasklist(tasklist);
		const taskDetails = {
			name: [...tasklist],
			_rev: rev,
		};

		axios
			.put(
				`http://localhost:5984/todolist-1/2ed85ec0fe47a2c775b232a88f047b9c`,
				taskDetails,
				{
					headers: {
						Authorization: `Basic ${token}`,
					},
				}
			)
			.then((res) => {
				setRev(res.data.rev);
				console.log("The value of response : ", res);
				console.log("Rev is : ", rev);
				console.log(res);
				/* console.log('Tasklist',tasklist); */
			})
			.catch((err) => console.log(err));
		console.log("The value of tasklist in the deleteItem is : ", tasklist);

		/* 	setTasklist(items) */
	};

	return (
		<div className="form">
			<div className={Styles.form}>
				<input
					className={Styles.form__input}
					type="text"
					onChange={handleChange}
					id="todo"
					placeholder=""
				/>
				<label className={Styles.form__label} for="todo">
					Enter Data Here
				</label>
				<button
					className={`btn btn-outline-success ${Styles.form__button}`}
					onClick={addTask}
				>
					Add
				</button>
			</div>

			{tasklist.map((t, index) => (
				<ul className={Styles.form__ul}>
					<li className={Styles.form__li}>
						<span className={Styles.form__span}>
							Value : <b>{t}</b>{" "}
						</span>

						<input
							className={Styles.form__output}
							type="text"
							placeholder="Updated value here"
							onChange={updateValue}
						/>
						<div className={Styles.form_button1}>
							<button className="btn btn-danger" onClick={() => deleteItem(index)}>Delete</button>
							<button className="btn btn-success" onClick={() => updateValueinCouch(index)}>Update</button>
						</div>
					</li>
				</ul>
			))}
		</div>
	);
}
export default TodoApp1;
