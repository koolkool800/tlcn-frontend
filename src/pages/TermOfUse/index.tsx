import { H4, H5, H6, Typography } from '@style/DefaultStyled';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { Divider, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import * as S from './style';

function createArrayUsingArrayFrom(num: number) {
  return Array.from({ length: num });
}
function TermOfUse() {
  const { t } = useTranslation();
  const theme = useTheme();
  const columns: ColumnsType<any> = [
    {
      title: t(
        'termOfUse.chapter4.article22.content.content1.content.table.thead.thead1'
      ),
      key: '1',
      dataIndex: 'tbody1',
    },
    {
      title: t(
        'termOfUse.chapter4.article22.content.content1.content.table.thead.thead2'
      ),
      key: '1',
      dataIndex: 'tbody2',
      className: 'tbody-bg',
    },
    {
      title: t(
        'termOfUse.chapter4.article22.content.content1.content.table.thead.thead3'
      ),
      key: '1',
      dataIndex: 'tbody3',
      className: 'tbody-bg',
    },
    {
      title: t(
        'termOfUse.chapter4.article22.content.content1.content.table.thead.thead4'
      ),
      key: '1',
      dataIndex: 'tbody4',
      className: 'tbody-bg',
    },
  ];
  const columns2: ColumnsType<any> = [
    {
      title: t(
        'termOfUse.chapter4.article26.content.content6.content.content4.table.thead.thead1'
      ),
      key: '1',
      dataIndex: 'tbody1',
    },
    {
      title: t(
        'termOfUse.chapter4.article26.content.content6.content.content4.table.thead.thead2'
      ),
      key: '1',
      dataIndex: 'tbody2',
      className: 'tbody-bg',
    },
  ];
  const data: any[] = [
    {
      key: '1',
      tbody1: t(
        'termOfUse.chapter4.article22.content.content1.content.table.tbody.tbody1'
      ),
      tbody2: t(
        'termOfUse.chapter4.article22.content.content1.content.table.tbody.tbody2'
      ),
      tbody3: t(
        'termOfUse.chapter4.article22.content.content1.content.table.tbody.tbody3'
      ),
      tbody4: t(
        'termOfUse.chapter4.article22.content.content1.content.table.tbody.tbody4'
      ),
    },
  ];
  const data2: any[] = [
    {
      key: '1',
      tbody1: t(
        'termOfUse.chapter4.article26.content.content6.content.content4.table.tbody.tbody1'
      ),
      tbody2: t(
        'termOfUse.chapter4.article26.content.content6.content.content4.table.tbody.tbody2'
      ),
    },
  ];
  return (
    <S.Container>
      <H4 style={{ textAlign: 'left' }}>{t('termOfUse.title')}</H4>
      <Divider
        className="divider-above"
        style={{
          width: '100%',
          background: theme?.colors?.emphasisDarkSurfaceSmall,
        }}
      />
      <H5 style={{ textAlign: 'left' }}>{t('termOfUse.chapter1.title')}</H5>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter1.article1.title')}</H6>
        <Typography>{t('termOfUse.chapter1.article1.content')}</Typography>
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter1.article2.title')}</H6>
        <Typography>
          {`1) ${t('termOfUse.chapter1.article2.content.content1.title')}`}
        </Typography>
        {createArrayUsingArrayFrom(14).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1} ) ${t(
              `termOfUse.chapter1.article2.content.content1.content.content${[
                index + 1,
              ]}`
            )}`}
          </Typography>
        ))}
        <Typography>
          {`2) ${t('termOfUse.chapter1.article2.content.content2.title')}`}
        </Typography>
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter1.article3.title')}</H6>
        {createArrayUsingArrayFrom(4).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1} ) ${t(
              `termOfUse.chapter1.article3.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter1.article4.title')}</H6>
        <Typography>{t('termOfUse.chapter1.article4.subText')}</Typography>
        {createArrayUsingArrayFrom(4).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1} ) ${t(
              `termOfUse.chapter1.article4.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>

      <div className="container-chapter">
        <H6>{t('termOfUse.chapter1.article5.title')}</H6>
        {createArrayUsingArrayFrom(2).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1} ) ${t(
              `termOfUse.chapter1.article5.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>

      <div className="container-chapter">
        <H6>{t('termOfUse.chapter1.article6.title')}</H6>
        {createArrayUsingArrayFrom(2).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1} ) ${t(
              `termOfUse.chapter1.article5.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>

      <div className="container-chapter">
        <H6>{t('termOfUse.chapter1.article7.title')}</H6>
        {createArrayUsingArrayFrom(2).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1} ) ${t(
              `termOfUse.chapter1.article7.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <Divider
        className="divider-above"
        style={{
          width: '100%',
          background: theme?.colors?.emphasisDarkSurfaceSmall,
        }}
      />
      <H5 style={{ textAlign: 'left' }}>{t('termOfUse.chapter2.title')}</H5>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter2.article8.title')}</H6>
        {createArrayUsingArrayFrom(4).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1} ) ${t(
              `termOfUse.chapter2.article8.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter2.article9.title')}</H6>
        {createArrayUsingArrayFrom(6).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1} ) ${t(
              `termOfUse.chapter2.article9.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter2.article10.title')}</H6>
        {createArrayUsingArrayFrom(4).map((_, index) => {
          return (
            <>
              {!t(
                `termOfUse.chapter2.article10.content.content${[index + 1]}`
              ).includes('termOfUse') ? (
                <Typography key={Math.random()} className="spacing">
                  {`${index + 1} ) ${t(
                    `termOfUse.chapter2.article10.content.content${[index + 1]}`
                  )}`}
                </Typography>
              ) : (
                <>
                  <Typography key={Math.random()} className="spacing">
                    {`${index + 1} ) ${t(
                      `termOfUse.chapter2.article10.content.content${[
                        index + 1,
                      ]}.title`
                    )}`}
                  </Typography>
                  {createArrayUsingArrayFrom(9).map((__, j) => {
                    if (
                      t(
                        `termOfUse.chapter2.article10.content.content${[
                          index + 1,
                        ]}.content.content${[j + 1]}`
                      ).includes('termOfUse')
                    ) {
                      return (
                        <div key={Math.random()} style={{ display: 'none' }} />
                      );
                    }
                    return (
                      <Typography
                        key={Math.random()}
                        className="spacing-level-2"
                      >
                        {`${j + 1} ) ${t(
                          `termOfUse.chapter2.article10.content.content${[
                            index + 1,
                          ]}.content.content${[j + 1]}`
                        )}`}
                      </Typography>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter2.article11.title')}</H6>
        <Typography className="spacing">
          {`1) ${t('termOfUse.chapter2.article11.content.content1')}`}
        </Typography>
        <Typography className="spacing">{`2) ${t(
          'termOfUse.chapter2.article11.content.content2.title'
        )}`}</Typography>
        {createArrayUsingArrayFrom(3).map((_, index) => (
          <Typography key={Math.random()} className="spacing-level-2">
            {`${index + 1}) ${t(
              `termOfUse.chapter2.article11.content.content2.content.content${[
                index + 1,
              ]}`
            )}`}
          </Typography>
        ))}
        <Typography className="spacing">{`3) ${t(
          'termOfUse.chapter2.article11.content.content3.title'
        )}`}</Typography>
        <Typography className="spacing-level-3">{`1) ${t(
          'termOfUse.chapter2.article11.content.content3.content.content1.title'
        )}`}</Typography>
        {createArrayUsingArrayFrom(12).map((_, index) => (
          <Typography key={Math.random()} className="spacing-level-4">{`${t(
            `termOfUse.chapter2.article11.content.content3.content.content1.listItem.item${[
              index + 1,
            ]}`
          )}`}</Typography>
        ))}
        <Typography className="spacing-level-3">{`2) ${t(
          'termOfUse.chapter2.article11.content.content3.content.content2'
        )}`}</Typography>
        <Typography className="spacing-level-3">{`3) ${t(
          'termOfUse.chapter2.article11.content.content3.content.content3'
        )}`}</Typography>
        <Typography className="spacing-level-3">{`4) ${t(
          'termOfUse.chapter2.article11.content.content3.content.content4'
        )}`}</Typography>
        <Typography className="spacing-level-3">{`5) ${t(
          'termOfUse.chapter2.article11.content.content3.content.content5'
        )}`}</Typography>
        <Typography className="spacing">{`4) ${t(
          'termOfUse.chapter2.article11.content.content4'
        )}`}</Typography>
      </div>
      <Divider
        className="divider-above"
        style={{
          width: '100%',
          background: theme?.colors?.emphasisDarkSurfaceSmall,
        }}
      />
      <H5 style={{ textAlign: 'left' }}>{t('termOfUse.chapter3.title')}</H5>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter3.article12.title')}</H6>
        {createArrayUsingArrayFrom(9).map((_, index) => {
          return (
            <>
              {!t(
                `termOfUse.chapter3.article12.content.content${[index + 1]}`
              ).includes('termOfUse') ? (
                <Typography key={Math.random()} className="spacing">
                  {`${index + 1} ) ${t(
                    `termOfUse.chapter3.article12.content.content${[index + 1]}`
                  )}`}
                </Typography>
              ) : (
                <>
                  <Typography key={Math.random()} className="spacing">
                    {`${index + 1} ) ${t(
                      `termOfUse.chapter3.article12.content.content${[
                        index + 1,
                      ]}.title`
                    )}`}
                  </Typography>
                  {createArrayUsingArrayFrom(9).map((__, j) => {
                    if (
                      t(
                        `termOfUse.chapter3.article12.content.content${[
                          index + 1,
                        ]}.content.content${[j + 1]}`
                      ).includes('termOfUse')
                    ) {
                      return (
                        <div key={Math.random()} style={{ display: 'none' }} />
                      );
                    }
                    return (
                      <Typography
                        key={Math.random()}
                        className="spacing-level-2"
                      >
                        {`${j + 1} ) ${t(
                          `termOfUse.chapter3.article12.content.content${[
                            index + 1,
                          ]}.content.content${[j + 1]}`
                        )}`}
                      </Typography>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter3.article13.title')}</H6>
        {createArrayUsingArrayFrom(2).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter3.article13.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter3.article14.title')}</H6>
        {createArrayUsingArrayFrom(3).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter3.article14.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter3.article15.title')}</H6>
        <Typography className="spacing">
          {`1) ${t('termOfUse.chapter3.article15.content.content1')}`}
        </Typography>
        <Typography className="spacing">
          {`2) ${t('termOfUse.chapter3.article15.content.content2.title')}`}
        </Typography>
        <Typography className="spacing">
          {t('termOfUse.chapter3.article15.content.content2.subTitle')}
        </Typography>
        {createArrayUsingArrayFrom(3).map((_, index) => (
          <Typography key={Math.random()} className="spacing-level-2">
            {`${index + 1}) ${t(
              `termOfUse.chapter3.article15.content.content2.content.content${[
                index + 1,
              ]}`
            )}`}
          </Typography>
        ))}
        <Typography className="spacing">
          {`3) ${t('termOfUse.chapter3.article15.content.content3')}`}
        </Typography>
      </div>
      <Divider
        className="divider-above"
        style={{
          width: '100%',
          background: theme?.colors?.emphasisDarkSurfaceSmall,
        }}
      />
      <H5 style={{ textAlign: 'left' }}>{t('termOfUse.chapter4.title')}</H5>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter4.article16.title')}</H6>
        {createArrayUsingArrayFrom(5).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter4.article16.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter4.article17.title')}</H6>
        {createArrayUsingArrayFrom(2).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter4.article17.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter4.article18.title')}</H6>
        {createArrayUsingArrayFrom(14).map((_, index) => {
          return (
            <>
              {!t(
                `termOfUse.chapter4.article18.content.content${[index + 1]}`
              ).includes('termOfUse') ? (
                <Typography key={Math.random()} className="spacing">
                  {`${index + 1} ) ${t(
                    `termOfUse.chapter4.article18.content.content${[index + 1]}`
                  )}`}
                </Typography>
              ) : (
                <>
                  <Typography key={Math.random()} className="spacing">
                    {`${index + 1} ) ${t(
                      `termOfUse.chapter4.article18.content.content${[
                        index + 1,
                      ]}.title`
                    )}`}
                  </Typography>
                  {createArrayUsingArrayFrom(9).map((__, j) => {
                    if (
                      t(
                        `termOfUse.chapter4.article18.content.content${[
                          index + 1,
                        ]}.content.content${[j + 1]}`
                      ).includes('termOfUse')
                    ) {
                      return (
                        <div key={Math.random()} style={{ display: 'none' }} />
                      );
                    }
                    return (
                      <Typography
                        key={Math.random()}
                        className="spacing-level-2"
                      >
                        {`${j + 1} ) ${t(
                          `termOfUse.chapter4.article18.content.content${[
                            index + 1,
                          ]}.content.content${[j + 1]}`
                        )}`}
                      </Typography>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter4.article19.title')}</H6>
        {createArrayUsingArrayFrom(6).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter4.article19.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter4.article20.title')}</H6>
        {createArrayUsingArrayFrom(2).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter4.article20.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter4.article21.title')}</H6>
        {createArrayUsingArrayFrom(3).map((_, index) => {
          return (
            <>
              {!t(
                `termOfUse.chapter4.article21.content.content${[index + 1]}`
              ).includes('termOfUse') ? (
                <Typography key={Math.random()} className="spacing">
                  {`${index + 1} ) ${t(
                    `termOfUse.chapter4.article21.content.content${[index + 1]}`
                  )}`}
                </Typography>
              ) : (
                <>
                  <Typography key={Math.random()} className="spacing">
                    {`${index + 1} ) ${t(
                      `termOfUse.chapter4.article21.content.content${[
                        index + 1,
                      ]}.title`
                    )}`}
                  </Typography>
                  {createArrayUsingArrayFrom(9).map((__, j) => {
                    if (
                      t(
                        `termOfUse.chapter4.article21.content.content${[
                          index + 1,
                        ]}.content.content${[j + 1]}`
                      ).includes('termOfUse')
                    ) {
                      return (
                        <div key={Math.random()} style={{ display: 'none' }} />
                      );
                    }
                    return (
                      <Typography
                        key={Math.random()}
                        className="spacing-level-2"
                      >
                        {`${j + 1} ) ${t(
                          `termOfUse.chapter4.article21.content.content${[
                            index + 1,
                          ]}.content.content${[j + 1]}`
                        )}`}
                      </Typography>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter4.article22.title')}</H6>
        {createArrayUsingArrayFrom(3).map((_, index) => {
          if (index + 1 === 1) {
            return (
              <>
                <Typography key={Math.random()} className="spacing">
                  {`${index + 1}) ${t(
                    `termOfUse.chapter4.article22.content.content${[
                      index + 1,
                    ]}.title`
                  )}`}
                </Typography>
                <Table
                  columns={columns}
                  dataSource={data}
                  style={{ width: '100%' }}
                  pagination={false}
                />
              </>
            );
          }
          return (
            <Typography key={Math.random()} className="spacing">
              {`${index + 1}) ${t(
                `termOfUse.chapter4.article22.content.content${[index + 1]}`
              )}`}
            </Typography>
          );
        })}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter4.article23.title')}</H6>
        {createArrayUsingArrayFrom(5).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter4.article23.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter4.article24.title')}</H6>
        {createArrayUsingArrayFrom(2).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter4.article24.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter4.article25.title')}</H6>
        {createArrayUsingArrayFrom(3).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter4.article25.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter4.article26.title')}</H6>
        {createArrayUsingArrayFrom(7).map((_, index) => {
          return (
            <>
              {!t(
                `termOfUse.chapter4.article26.content.content${[index + 1]}`
              ).includes('termOfUse') ? (
                <Typography key={Math.random()} className="spacing">
                  {`${index + 1} ) ${t(
                    `termOfUse.chapter4.article26.content.content${[index + 1]}`
                  )}`}
                </Typography>
              ) : (
                <>
                  <Typography key={Math.random()} className="spacing">
                    {`${index + 1} ) ${t(
                      `termOfUse.chapter4.article26.content.content${[
                        index + 1,
                      ]}.title`
                    )}`}
                  </Typography>
                  {createArrayUsingArrayFrom(9).map((__, j) => {
                    if (
                      t(
                        `termOfUse.chapter4.article26.content.content${[
                          index + 1,
                        ]}.content.content${[j + 1]}`
                      ).includes('termOfUse')
                    ) {
                      if (
                        t(
                          `termOfUse.chapter4.article26.content.content${[
                            index + 1,
                          ]}.content.content${[j + 1]}`
                        ).includes('instead of string.')
                      ) {
                        return (
                          <>
                            <Typography
                              key={Math.random()}
                              className="spacing-level-2"
                            >
                              {`${j + 1}) ${t(
                                `termOfUse.chapter4.article26.content.content${[
                                  index + 1,
                                ]}.content.content${[j + 1]}.title`
                              )}`}
                            </Typography>
                            {j + 1 === 4 && (
                              <Table
                                columns={columns2}
                                dataSource={data2}
                                style={{ width: '100%' }}
                                pagination={false}
                              />
                            )}
                            {j + 1 === 6 &&
                              createArrayUsingArrayFrom(5).map((___, x) => (
                                <Typography
                                  key={Math.random()}
                                  className="spacing-level-3"
                                >
                                  {`${x + 1}) ${t(
                                    `termOfUse.chapter4.article26.content.content${[
                                      index + 1,
                                    ]}.content.content${[
                                      j + 1,
                                    ]}.content.content${[x + 1]}`
                                  )}`}
                                </Typography>
                              ))}
                          </>
                        );
                      }
                      console.log(
                        '0-0-0-0-0-00-',
                        t(
                          `termOfUse.chapter4.article26.content.content${[
                            index + 1,
                          ]}.content.content${[j + 1]}`
                        )
                      );
                      return (
                        <div key={Math.random()} style={{ display: 'none' }} />
                      );
                    }
                    return (
                      <Typography
                        key={Math.random()}
                        className="spacing-level-2"
                      >
                        {`${j + 1} ) ${t(
                          `termOfUse.chapter4.article26.content.content${[
                            index + 1,
                          ]}.content.content${[j + 1]}`
                        )}`}
                      </Typography>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </div>
      <Divider
        className="divider-above"
        style={{
          width: '100%',
          background: theme?.colors?.emphasisDarkSurfaceSmall,
        }}
      />
      <H5 style={{ textAlign: 'left' }}>{t('termOfUse.chapter5.title')}</H5>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter5.article27.title')}</H6>
        {createArrayUsingArrayFrom(2).map((_, index) => {
          return (
            <>
              {!t(
                `termOfUse.chapter5.article27.content.content${[index + 1]}`
              ).includes('termOfUse') ? (
                <Typography key={Math.random()} className="spacing">
                  {`${index + 1} ) ${t(
                    `termOfUse.chapter5.article27.content.content${[index + 1]}`
                  )}`}
                </Typography>
              ) : (
                <>
                  <Typography key={Math.random()} className="spacing">
                    {`${index + 1} ) ${t(
                      `termOfUse.chapter5.article27.content.content${[
                        index + 1,
                      ]}.title`
                    )}`}
                  </Typography>
                  {createArrayUsingArrayFrom(9).map((__, j) => {
                    if (
                      t(
                        `termOfUse.chapter5.article27.content.content${[
                          index + 1,
                        ]}.content.content${[j + 1]}`
                      ).includes('termOfUse')
                    ) {
                      return (
                        <div key={Math.random()} style={{ display: 'none' }} />
                      );
                    }
                    return (
                      <Typography
                        key={Math.random()}
                        className="spacing-level-2"
                      >
                        {`${j + 1} ) ${t(
                          `termOfUse.chapter5.article27.content.content${[
                            index + 1,
                          ]}.content.content${[j + 1]}`
                        )}`}
                      </Typography>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </div>
      <Divider
        className="divider-above"
        style={{
          width: '100%',
          background: theme?.colors?.emphasisDarkSurfaceSmall,
        }}
      />
      <H5 style={{ textAlign: 'left' }}>{t('termOfUse.chapter6.title')}</H5>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter6.article28.title')}</H6>
        {createArrayUsingArrayFrom(6).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter6.article28.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter6.article29.title')}</H6>
        <Typography key={Math.random()} className="spacing">
          {t(`termOfUse.chapter6.article29.content`)}
        </Typography>
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter6.article30.title')}</H6>
        {createArrayUsingArrayFrom(3).map((_, index) => {
          return (
            <>
              {!t(
                `termOfUse.chapter6.article30.content.content${[index + 1]}`
              ).includes('termOfUse') ? (
                <Typography key={Math.random()} className="spacing">
                  {`${index + 1} ) ${t(
                    `termOfUse.chapter6.article30.content.content${[index + 1]}`
                  )}`}
                </Typography>
              ) : (
                <>
                  <Typography key={Math.random()} className="spacing">
                    {`${index + 1} ) ${t(
                      `termOfUse.chapter6.article30.content.content${[
                        index + 1,
                      ]}.title`
                    )}`}
                  </Typography>
                  {createArrayUsingArrayFrom(11).map((__, j) => {
                    if (
                      t(
                        `termOfUse.chapter6.article30.content.content${[
                          index + 1,
                        ]}.content.content${[j + 1]}`
                      ).includes('termOfUse')
                    ) {
                      return (
                        <div key={Math.random()} style={{ display: 'none' }} />
                      );
                    }
                    return (
                      <Typography
                        key={Math.random()}
                        className="spacing-level-2"
                      >
                        {`${j + 1} ) ${t(
                          `termOfUse.chapter6.article30.content.content${[
                            index + 1,
                          ]}.content.content${[j + 1]}`
                        )}`}
                      </Typography>
                    );
                  })}
                </>
              )}
            </>
          );
        })}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter6.article31.title')}</H6>
        {createArrayUsingArrayFrom(2).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter6.article31.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter6.article32.title')}</H6>
        {createArrayUsingArrayFrom(4).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter6.article32.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.chapter6.article33.title')}</H6>
        {createArrayUsingArrayFrom(3).map((_, index) => (
          <Typography key={Math.random()} className="spacing">
            {`${index + 1}) ${t(
              `termOfUse.chapter6.article33.content.content${[index + 1]}`
            )}`}
          </Typography>
        ))}
      </div>
      <div className="container-chapter">
        <H6>{t('termOfUse.supplementaryProvisions.title')}</H6>
        <Typography key={Math.random()} className="spacing">
          {t(`termOfUse.supplementaryProvisions.content`)}
        </Typography>
      </div>
    </S.Container>
  );
}

export default TermOfUse;
