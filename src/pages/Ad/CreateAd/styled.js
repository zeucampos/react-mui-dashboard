import styled from "styled-components";
import { FlexColumn } from "theme/styled";

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  flex-wrap: wrap;
  gap: 16px;
`;

export const ImageContainer = styled(FlexColumn)`
  padding: 10px;
  border-radius: 16px;
  background-color: white;

  img {
    border-radius: 16px;
  }
`;

export const ImageWrapper = styled.div``;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 5px;
`;

export const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
`;

export const Input = styled.input`
  display: none;
`;

export const Label = styled.label`
  display: inline-block;
  background-color: #eee;
  color: #666;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;
