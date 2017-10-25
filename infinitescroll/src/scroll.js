import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getTheData } from './action';


class Scroll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      polling : false,
      page: 30,
      something:'',
    };
  }


  componentWillMount = () => {
    this.props.getTheData(this.state.page);
    this.setState({
      ...this.state,
      page:29
    })
  }
  
  // 타겟의 scroll Event가 발생 했을 때 
  componentDidMount = () => {
    this.setState({
      ...this.state, polling: true,
    })
    const target = document.querySelector('div.content-container')
    target.addEventListener('scroll', this.handleOnScroll);
  }


  // props변화에 따라  스크롤 위치 조정
  componentDidUpdate = (prevProps, prevState) => {
    const target = document.querySelector('div.content-container')

    const bottom = target.scrollHeight
    if (prevProps.posts.length !== this.props.posts.length) {
      console.log('들어왔다')
      setTimeout(target.scrollTop = target.scrollHeight - (target.scrollHeight-1963), 2000)      
    }
  }

  // componentWillUnMount = () => {
  //   window.removeEventListener('scroll', this.handleOnScroll);
  // }

  // 타겟의 scroll 위치 값 계산해주는 함수
  getDistFromBottom = () => {
    const target = document.querySelector('div.content-container')
    const scrollTop = (target && target.scrollTop) || target.scrollTop;
    // console.log('스크롤top'+ scrollTop)
    // const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    // const clientHeight = document.documentElement.clientHeight || window.innerHeight;
     
    // console.log(scrollHeight)
    // console.log(scrollTop)
  
    return Math.ceil(scrollTop)
  }

  // scrollTop 이 0 이면 ACTION getTheData 실행, 현재 페이지 값을 넘겨 주어 다음 페이지를 받아 온다.
  handleOnScroll = () => {
    const scrolledToBottom = this.getDistFromBottom();
    // console.log(scrolledToBottom +"!!")
    // console.log('들어왔다.')

    if(!scrolledToBottom) {
      this.setState({...this.state, polling:true, something:'no-content'})
      setTimeout(this.props.getTheData(this.state.page), 6000)
      this.setState({...this.state, page: this.state.page-1})
    } else {
      this.setState({...this.state, polling:false})
    }
  }



  render() {
    if(this.props.errorState) {
      return(
        <h1>네트워크 요청중 문제가 발생하였습니다.</h1>
      )
    }
    return(
      <div>
        <h2 className="headline">Tech In Asia Articles</h2>
        <p> Sorry TIA for the infinite scroll... </p>
        <hr />
        <div className="content-container">
          {this.props.posts.map(post => (
            <article>
              <h3 className="title">
                {post.title}
              </h3>
              <img src={post.featured_image.source} className="feat" alt="이미지"/>
            </article>
          ))}
        </div>
        {(() => {
          if (this.state.polling) {
            return(
              <div className={`loading-container ${this.state.something}`}>
                <div className="loading">
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
                  <div className="loading-bar"></div>
                </div>
              </div>
            );
          } else {
            return(
              <div className="loading-container"></div>
            );
          }
        })()}       
      </div>
    );
  };
}

const mapStateToProps = (state) => ({
  isLoading: state.data.isLoading, 
  errorState: state.data.errorState, 
  posts: state.data.posts, 

})

const mapDispatchToProps = (dispatch) => ({
  getTheData: (page) => (dispatch(getTheData(page))),
})

export default connect(mapStateToProps, mapDispatchToProps)(Scroll)