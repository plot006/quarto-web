import React, { Component } from "react";
import { Buffer } from "buffer";
import Emulator from "../emulator";
import InviteHeader from "./InviteHeader";
import jsnes from "jsnes";
import styles from "./PlayScreen.module.css";
import nesImage from "../assets/nes.png";

export default class PlayScreen extends Component {
	state = { bytes: null };

	render() {
		const { bytes } = this.state;
		return (
			<div className={styles.app}>
				<InviteHeader onChannel={(channel) => (this.channel = channel)} />

				<div className={styles.main}>
					<section
						className={`${
							styles.gameContainer
						} nes-container is-dark with-title`}
					>
						<h3 className="title">
							<img className={styles.nesImage} src={nesImage} alt="nes" />
						</h3>
						{bytes && (
							<Emulator bytes={bytes} ref={(ref) => (this.emulator = ref)} />
						)}
					</section>
				</div>
			</div>
		);
	}

	async componentDidMount() {
		if (!this.props.rom) {
			window.location.hash = "";
			return;
		}

		const arrayBuffer = this.props.rom;
		const bytes = Buffer.from(arrayBuffer);
		this.setState({ bytes });

		window.addEventListener("resize", this._onResize);
		window.addEventListener("keydown", this._onKeyDown);
		window.addEventListener("keyup", this._onKeyUp);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this._onResize);
		window.removeEventListener("keydown", this._onKeyDown);
		window.removeEventListener("keyup", this._onKeyUp);
	}

	_onResize = () => {};

	_onKeyDown = (e) => {
		setTimeout(() => {
			switch (e.key) {
				case "s":
					this.emulator.nes.buttonDown(1, jsnes.Controller.BUTTON_B);
					break;
				case "d":
					this.emulator.nes.buttonDown(1, jsnes.Controller.BUTTON_A);
					break;
				case "ArrowUp":
					this.emulator.nes.buttonDown(1, jsnes.Controller.BUTTON_UP);
					break;
				case "ArrowDown":
					this.emulator.nes.buttonDown(1, jsnes.Controller.BUTTON_DOWN);
					break;
				case "ArrowLeft":
					this.emulator.nes.buttonDown(1, jsnes.Controller.BUTTON_LEFT);
					break;
				case "ArrowRight":
					this.emulator.nes.buttonDown(1, jsnes.Controller.BUTTON_RIGHT);
					break;
				case "Enter":
					this.emulator.nes.buttonDown(1, jsnes.Controller.BUTTON_START);
					break;
				case "Delete":
					this.emulator.nes.buttonDown(1, jsnes.Controller.BUTTON_SELECT);
					break;
				default:
			}
		}, 80);
	};

	_onKeyUp = (e) => {
		setTimeout(() => {
			switch (e.key) {
				case "s":
					this.emulator.nes.buttonUp(1, jsnes.Controller.BUTTON_B);
					break;
				case "d":
					this.emulator.nes.buttonUp(1, jsnes.Controller.BUTTON_A);
					break;
				case "ArrowUp":
					this.emulator.nes.buttonUp(1, jsnes.Controller.BUTTON_UP);
					break;
				case "ArrowDown":
					this.emulator.nes.buttonUp(1, jsnes.Controller.BUTTON_DOWN);
					break;
				case "ArrowLeft":
					this.emulator.nes.buttonUp(1, jsnes.Controller.BUTTON_LEFT);
					break;
				case "ArrowRight":
					this.emulator.nes.buttonUp(1, jsnes.Controller.BUTTON_RIGHT);
					break;
				case "Enter":
					this.emulator.nes.buttonUp(1, jsnes.Controller.BUTTON_START);
					break;
				case "Delete":
					this.emulator.nes.buttonUp(1, jsnes.Controller.BUTTON_SELECT);
					break;
				default:
			}
		}, 80);
	};
}