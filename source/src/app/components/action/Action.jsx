import React, { useState, useEffect } from "react";
import Select from "react-select";
import swal from "@sweetalert/with-react";
import { FaFileAlt, FaTimes, FaCog } from "react-icons/fa";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";
// ==========================================================
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
// ===========================================================

export default function Action(props) {
	const dispatch = useDispatch();
	const getRedux = useSelector((state) => state);
	const closeModal = () => {
		dispatch({ type: "MODAL-ACTION", payload: "hide-mod" });
	};

	const onChange = (ev) => {
		dispatch({ type: "ACTION-VALUE", payload: ev });
	};
	return (
		<div>
			<div className={`modal-costumes ${getRedux.modalAttrAction}`}>
				<div className="flex-center-between items-center mb-3">
					<h5>Action Papper</h5>
					<span
						className="btn-closed"
						onClick={() => {
							$(".modal-costumes").addClass("hide-mod").removeClass("show-mod");
							closeModal();
						}}
					>
						<FaTimes />
					</span>
				</div>
				<hr />
				<AceEditor
					placeholder="Placeholder Text"
					mode="json"
					theme="monokai"
					name="blah2"
					// onLoad={this.onLoad}
					onChange={onChange}
					fontSize={14}
					// showPrintMargin={true}
					// showGutter={true}
					// highlightActiveLine={true}
					value={getRedux.ACTIONVALUE}
					setOptions={{
						enableBasicAutocompletion: true,
						enableLiveAutocompletion: true,
						enableSnippets: true,
						showLineNumbers: true,
						tabSize: 2,
					}}
					style={{ width: "100%", height: "75%", paddingBottom: "10ppx" }}
				/>
				<hr />
			</div>
		</div>
	);
}
