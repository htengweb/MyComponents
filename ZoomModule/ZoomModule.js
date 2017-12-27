import React from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import styles from './ZoomModule.css';

class ZoomModule extends React.Component{
	constructor(props){
		super();
		this.state={
			clientWidth:document.documentElement.clientWidth,
			clientHeight:document.documentElement.clientHeight,
			isMoveRight:false,
			isMoveBottom:false,
			isMoveAll:false,
			isDrag:false,
			startX:0,
			startY:0,
			top:props.top,
			left:props.left,
			width:props.width,
			height:props.height,
			aligncenter:props.aligncenter,
		}
	}
	//右拉伸
	onMouseDownRight=()=>{
		this.setState({
			isMoveRight:true,
		})
	}
	//下拉伸
	onMouseDownBottom=()=>{
		this.setState({
			isMoveBottom:true,
		})
	}
	//右下拉伸
	onMouseDownAll=()=>{
		this.setState({
			isMoveAll:true,
		})
	}
	//拖拽
	onMouseDownHeader=(ev)=>{
		const oEvent=ev || event;
		this.setState({
			isDrag:true,
			startX:oEvent.clientX,
			startY:oEvent.clientY,
		})
	}
	onMouseMove=(ev)=>{
		const oBox=ReactDom.findDOMNode(this.box);
		const {isMoveRight,isMoveBottom,isMoveAll,isDrag,top,left,startX,startY,clientWidth,clientHeight}=this.state;
		const oEvent=ev || event;
		if (isMoveRight){//右拉伸
			this.setState({
				width:oEvent.clientX-left,
			});
		}else if(isMoveBottom){//下拉伸
			this.setState({
				height:oEvent.clientY-top,
			});
		}else if(isMoveAll){//同时拉伸
			this.setState({
				width:oEvent.clientX-left,
				height:oEvent.clientY-top,
			});
		}else if(isDrag){//拖拽
			let tempLeft=oEvent.clientX-startX+left;
			let tempTop=oEvent.clientY-startY+top;
			if (tempTop<0) {
				tempTop=0;
			}else if ((tempTop+oBox.offsetHeight)>clientHeight) {
				tempTop=clientHeight-oBox.offsetHeight;
			}
			if (tempLeft<0) {
				tempLeft=0
			}else if((tempLeft+oBox.offsetWidth)>clientWidth){
				tempLeft=clientWidth-oBox.offsetWidth;
			}
			this.setState({
				top:tempTop,
				left:tempLeft,
				startX:oEvent.clientX,
				startY:oEvent.clientY,
			});
		}
	}
	onMouseUp=(ev)=>{
		this.setState({
			isMoveRight:false,
			isMoveBottom:false,
			isMoveAll:false,
			isDrag:false,
		})
	}
	render(){
		const {width,height,top,left,clientWidth,aligncenter}=this.state;
		const {children}=this.props;
		return (
			<div
				className={styles.normal}
				onMouseMove={this.onMouseMove}
				onMouseUp={this.onMouseUp}
			>
				<div
					ref={node=>this.box=node}
					className={styles.box}
					style={{
						width:width+10+'px',
						height:height+10+'px',
						top:top+'px',
						left:aligncenter?(clientWidth-width)/2+'px':left+'px'
					}}
				>
					<div onMouseDown={this.onMouseDownHeader} className={styles.header}></div>
					<div className={styles.content}>
						{children}
					</div>
					<div onMouseDown={this.onMouseDownRight}className={styles.right_drag}></div>
					<div onMouseDown={this.onMouseDownBottom} className={styles.bottom_drag}></div>
					<div onMouseDown={this.onMouseDownAll} className={styles.all_drag}></div>
				</div>
			</div>
		);
	}
	componentDidMount(){
		window.addEventListener('resize',()=>{
			this.setState({
				clientWidth:document.documentElement.clientWidth,
				clientHeight:document.documentElement.clientHeight,
			})
		},true);
	}
	componentWillUnmount(){

	}
}
//设置props默认值
ZoomModule.defaultProps ={
	loading:false,
	aligncenter:false,
	top:0,
	left:0,
	width:300,
	height:300,
}
//设置props类型
ZoomModule.propsTypes={
	loading:PropTypes.bool,
	aligncenter:PropTypes.bool,
	top:PropTypes.number,
	left:PropTypes.number,
	width:PropTypes.number,
	height:PropTypes.number,
	children:PropTypes.element,
}
export default ZoomModule;
