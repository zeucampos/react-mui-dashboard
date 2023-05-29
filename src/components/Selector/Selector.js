import React, { useState } from "react";

import * as S from "./styled";

function Selector({ options, selected, onSelect }) {
  // const [active, setActive] = useState(options[0]);
  return (
    <S.Wrapper>
      {options.map((i) => (
        <S.Item
          key={i}
          onClick={() => {
            if (onSelect) onSelect(i);
          }}
          active={selected === i}
        >
          {i}
        </S.Item>
      ))}
    </S.Wrapper>
  );
}

export default Selector;
