import _ from 'lodash';
import React, { Component } from 'react'; //get react from the modules
import ReactDOM from 'react-dom';//we have to use the react dom too
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyDTcoLP0Y35GCNoq4M9dcEAIe2PhtO5NHk';


class App extends Component { //es6 syntax, => is pretty much like function,  it declares a variable taht is never gonna change
	constructor(props) {
    super(props);

    this.state = { 
      videos: [], 
      selectedVideo: null
    };

  this.videoSearch('cats');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300)
    //this is also how google instant search works, so won't search too often and annoy
    return (
		  <div>
			 <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
		  </div>
	  );//what is with the html? its JSX! only looks like html
  }
}

//take this component's generated html
//put it on the page (in the dom)
ReactDOM.render(<App />, document.querySelector('.container'));