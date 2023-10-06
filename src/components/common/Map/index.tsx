/* eslint-disable import/no-extraneous-dependencies */
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useEffect } from 'react';
import { Container } from '@style/DefaultStyled';
import { Grid } from 'antd';
import { $$, handleOnClickItem, handleActiveItemMap } from '@utils/handleMap';
import * as S from './style';

function Map({
  stadiumMap,
  onClick,
  selectedArea,
  classSelected,
  isSeller,
  isStatic,
}: {
  classSelected?: { groupName?: string };
  stadiumMap?: string;
  onClick?: any;
  selectedArea?: any;
  isSeller?: boolean;
  isStatic?: boolean;
}) {
  /**
   * get Item from DOM and handle whether it can click or not
   * @returns {void}
   */
  useEffect(() => {
    const gElements = Array.from($$('g[id="Group"] > g'));
    const WrapperFunction = (e: any) => {
      if (!isSeller && !isStatic) {
        const elementGroup = handleOnClickItem(e, gElements);
        onClick(elementGroup);
      }
    };
    gElements.forEach((element: any) => {
      element.addEventListener('click', WrapperFunction);
      if (!isSeller) {
        element.style.cursor = 'pointer';
      }
    });
    return () => {
      gElements.forEach((gElement) => {
        gElement.removeEventListener('click', WrapperFunction);
      });
    };
  }, [stadiumMap]);

  /** handle selected Area */
  useEffect(() => {
    const gElements = Array.from($$('g[id="Group"] > g'));
    if (isSeller) {
      gElements.forEach((element: any) => {
        if (element.getAttribute('id') === selectedArea?.groupId) {
          element.style.opacity = '1';
        } else {
          element.style.opacity = '0.2';
        }
      });
    }
  }, [selectedArea]);

  /** handle select map from input form */
  useEffect(() => {
    if (classSelected) {
      handleActiveItemMap(classSelected?.groupName);
    }
  }, [classSelected]);

  return (
    <S.Wrapper>
      <div className="container-img">
        {stadiumMap && (
          <TransformWrapper>
            <TransformComponent>
              <div
                dangerouslySetInnerHTML={{
                  __html: stadiumMap,
                }}
              />
            </TransformComponent>
          </TransformWrapper>
        )}
      </div>
    </S.Wrapper>
  );
}
export default Map;
