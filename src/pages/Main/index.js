import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';

import { Container, Form } from './styles';
import CompareList from '../../components/CompareLis';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: JSON.parse(localStorage.getItem('repositorySave')) || [],
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    try {
      const { repositories, repositoryInput } = this.state;
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      this.saveToStorage();
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  saveToStorage = (updatedRepositories) => {
    localStorage.setItem('repositorySave', JSON.stringify(updatedRepositories));
  };

  handleDeleteRepository = async (id) => {
    const { repositories } = this.state;

    const updatedRepositories = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: updatedRepositories });

    this.saveToStorage(updatedRepositories);
  };

  handleUpdateRepository = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === data.id ? data : repo)),
      });

      this.saveToStorage();
    } catch {
      this.setState({ repositoryError: true });
    }
  };

  render() {
    const {
      repositories, repositoryError, repositoryInput, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}</button>
        </Form>
        <CompareList
          repositories={repositories}
          deleteRepository={this.handleDeleteRepository}
          updateRepository={this.handleUpdateRepository}
        />
      </Container>
    );
  }
}
