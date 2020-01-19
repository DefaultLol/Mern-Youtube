import React, { Component } from 'react';
import {Container,Form,FormGroup,Input,Button} from 'reactstrap';
import {downloadVideo,loadingVideo} from '../actions/homeActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            url:'',
            stay:0,
            time:0
        }
    }
    componentDidUpdate(prevProps){
        if(!this.props.isAuthenticated && this.props.finish){
            this.setState({
                stay:1
            });
        }
        else if(this.props.isAuthenticated && this.props.finish && this.state.time!=1){
            this.setState({
                stay:2,
                time:1
            });
        }
    }

    onSubmitForm=(e)=>{
        e.preventDefault();
        const newUrl={
            url:this.state.url
        }
        this.props.loadingVideo();
        this.props.downloadVideo(newUrl);
    }
    onChangeUrl=(e)=>{
        this.setState({
            url:e.target.value
        });
    }

    render() {
        console.log(this.state.stay);
        if(this.state.stay==2){
            return (
                <div>
                    <Container>
                        <Form onSubmit={this.onSubmitForm}>
                            <FormGroup>
                                <h3 className="text-center" style={{marginBottom:'2rem'}}>Download One Video</h3>
                                <Input type="text" name="url" id="url" placeholder="Enter youtube video url" onChange={this.onChangeUrl} />
                                <Button color="dark" style={{marginTop:'2rem'}} block>Download</Button>
                                {this.props.home.loading && <p className="text-center" style={{marginTop:"2rem"}}><i className="fa fa-refresh fa-spin" style={{fontSize:"80px",color:"#00bfff"}}></i><br /><span>Genrating Link</span></p>}
                            </FormGroup>
                        </Form>
                        {this.props.home.linkMp3 && <div className="text-center"><a href={''+this.props.home.linkMp3+'.mp3'} download>Mp3 Link</a></div>}
                        {this.props.home.linkMp4 && <div className="text-center"><a href={''+this.props.home.linkMp4+'.mp4'} download>Mp4 Link</a></div>}       
                    </Container>
                </div>
            )
        }
        else if(this.state.stay==1){
            return(
                <Redirect to="/" />
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
}

Home.proptype={
    downloadVideo:PropTypes.func.isRequired,
    loadingVideo:PropTypes.func.isRequired,
    loadingEnd:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool
}
const mapStateToProps=(state)=>({
    home:state.home,
    isAuthenticated:state.auth.isAuthenticated,
    finish:state.auth.finish
});

export default connect(mapStateToProps,{downloadVideo,loadingVideo})(Home);
