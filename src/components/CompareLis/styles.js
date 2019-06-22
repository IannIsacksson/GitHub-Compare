import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  margin: 0 10px;

  display: flex;
  flex-direction: column;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    i {
      color: #999;
      cursor: pointer;
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 20px;
    }

    img {
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }

    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;

    li {
      font-weight: bold;
      padding: 12px 20px;

      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n - 1) {
        background: #f5f5f5;
      }
    }
  }

  footer {
    background: #63f5b0;
    display: flex;
    justify-content: center;
    border-radius: 0 0 3px 3px;
    &:hover {
      background: #52d89f;
      transition: 0.2s;
    }
    button {
      width: 100%;
      font-size: 20px;
      font-weight: bold;
      border: none;
      background: none;
      color: #fff;
      padding: 10px;
      cursor: pointer;
    }
  }
`;
