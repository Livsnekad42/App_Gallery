import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
  Button,
} from 'react-native';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      pageNumber: 1,
      modalVisible: false,
      modalImage: '',
    };

    this.pagePrev = this.pagePrev.bind(this);
    this.pageNext = this.pageNext.bind(this);
    this.getData = this.getData.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  getData(page) {
    fetch(
      `https://pixabay.com/api/?key=16706234-ca8a2febb9d001ab1bb23211b&page=${page}`,
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({images: data.hits});
      });
  }

  pagePrev() {
    if (this.state.pageNumber > 1) {
      this.setState(state => ({
        pageNumber: state.pageNumber - 1,
      }));
      this.getData(this.state.pageNumber);
    }
  }

  pageNext() {
    this.setState(state => ({
      pageNumber: state.pageNumber + 1,
    }));
    this.getData(this.state.pageNumber);
  }

  setModalVisible(vision, imageURL) {
    this.setState({modalVisible: vision});
    this.setState({modalImage: imageURL});
  }

  componentDidMount() {
    fetch(
      `https://pixabay.com/api/?key=16706234-ca8a2febb9d001ab1bb23211b&page=${
        this.state.pageNumber
      }`,
    )
      .then(response => response.json())
      .then(data => {
        this.setState({images: data.hits});
      });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          {this.state.images.map(image => (
            <TouchableWithoutFeedback
              onPress={() => this.setModalVisible(true, image.largeImageURL)}>
              <View style={styles.imagewrap}>
                <Image
                  source={{uri: image.webformatURL}}
                  style={styles.image}
                />
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <View style={styles.buttons}>
          <Button title="Previous Page" onPress={this.pagePrev} />
          <Button title="Next Page" onPress={this.pageNext} />
        </View>
        <Modal
          style={styles.modal}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}>
          <View style={styles.modal}>
            <Text
              onPress={() => this.setModalVisible(false)}
              style={styles.text}>
              Close
            </Text>
            <Image source={{uri: this.state.modalImage}} style={styles.image} />
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: null,
    marginLeft: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  imagewrap: {
    margin: 2,
    padding: 2,
    height: Dimensions.get('window').height / 3 - 5,
    width: Dimensions.get('window').width / 2 - 20,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
    marginTop: 15,
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  text: {
    color: '#fff',
  },
  contentContainer: {
    marginTop: 10,
  },
});

export default App;
