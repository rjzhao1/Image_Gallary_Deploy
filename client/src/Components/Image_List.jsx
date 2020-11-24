import React, { Component } from 'react';
import axios from 'axios';
import './css/Image_List.css';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { SRLWrapper } from 'simple-react-lightbox';
import LazyLoad from 'react-lazyload';

const Image = (props) => (
	<LazyLoad>
		<div className="gallery_item">
			<img
				src={props.image.image_url}
				alt={
					'Name: ' +
					props.image.name +
					' Upload Date: ' +
					props.image.createdAt.substring(0, 10)
				}
			/>
			{props.image.flagged ? (
				<AiFillHeart
					className="icon"
					onClick={() => props.toggleFlag(props.image._id)}
				/>
			) : (
				<AiOutlineHeart
					className="icon"
					onClick={() => props.toggleFlag(props.image._id)}
				/>
			)}
		</div>
	</LazyLoad>
);

export default class ImageList extends Component {
	constructor(props) {
		super(props);

		this.imagesList = this.imagesList.bind(this);
		this.toggleFlag = this.toggleFlag.bind(this);
		this.selectFile = this.selectFile.bind(this);
		this.uploadFile = this.uploadFile.bind(this);
		this.cancelFile = this.cancelFile.bind(this);

		this.state = {
			images: [],
			uploadFile: null,
			error: '',
		};
	}

	componentDidMount() {
		axios
			.get('/api/image')
			.then((res) => this.setState({ images: res.data }))
			.catch((err) => console.log(err));
	}

	selectFile(e) {
		const type = ['image/png', 'image/jpeg'];
		const selectedFile = e.target.files[0];
		if (type.includes(selectedFile.type)) {
			this.setState({ uploadFile: selectedFile, error: '' });
		} else {
			this.setState({
				uploadFile: null,
				error: 'Please select an png/jpeg file',
			});
		}
	}

	uploadFile() {
		const fd = new FormData();

		if (this.state.uploadFile) {
			fd.append(
				'newImage',
				this.state.uploadFile,
				this.state.uploadFile.name
			);
			axios
				.post('/api/image/add', fd)
				.then((res) =>
					this.setState({
						images: [...this.state.images, res.data],
						uploadFile: null,
					})
				)
				.catch((err) => console.log(err));
		}
	}

	toggleFlag(id) {
		axios
			.post('/api/image/toggleFlag/' + id)
			.then((res) => {
				const new_images = [...this.state.images];
				for (const image of new_images) {
					if (image._id === id) {
						image.flagged = !image.flagged;
					}
				}

				this.setState({ images: new_images });
			})
			.catch((err) => console.log(err));
	}

	cancelFile() {
		this.setState({ uploadFile: null });
	}

	imagesList() {
		return this.state.images.map((currImage) => {
			return (
				<Image
					key={currImage._id}
					image={currImage}
					toggleFlag={this.toggleFlag}
				/>
			);
		});
	}
	render() {
		return (
			<div>
				<div>
					{!this.state.uploadFile ? (
						<label>
							<span>Choose File</span>
							<input type="file" onChange={(e) => this.selectFile(e)} />
						</label>
					) : (
						<div>
							<label>
								<span>Upload</span>
								<button onClick={() => this.uploadFile()}></button>
							</label>
						</div>
					)}

					<div>
						{this.state.uploadFile && this.state.uploadFile.name}
						<p className="error">{this.state.error}</p>
					</div>

					{this.state.uploadFile && (
						<MdCancel
							className="icon"
							onClick={() => this.cancelFile()}
						/>
					)}
				</div>
				<SRLWrapper>
					<div className="gallery">{this.imagesList()}</div>
				</SRLWrapper>
			</div>
		);
	}
}
