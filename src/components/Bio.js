import React from 'react'
import styled from 'styled-components'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const Heading = styled.div`
  padding: 10px 20px;
  position: absolute;
  background-color: #3c4557;
  font-family: ${props => props.theme.fontBase};
  font-size: 14px;
  color: #fff;
  left: 45%;
  top: -22px;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 2px;

  &.rel {
    position: relative;
    top: inherit;
    left: inherit;
    display: inline-block;


    &.light {
      background-color: white;
      color: #3c4557;
    }
  }

  &.center {
    display: flex;
    justify-content: center;
    width: max-content;
    margin: 0 auto;
  }
`

const BioContainer = styled.div`

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 80px auto;
  width: 800px;

  @media only screen and (max-width: ${props => props.theme.tablet}) {
    width: initial;
  }



  &.direction-1 {
    flex-direction: row;

    .bio-image {
      margin-right: 50px;
      margin-left: 20px;

      img {
        height: inherit !important;
      }
    }

    img {
        height: inherit !important;
      }
  }

  &.direction-0 {
    flex-direction: row-reverse;

    @media only screen and (max-width: ${props => props.theme.tablet}) {
      flex-direction: row;

      .bio-image {
        margin-left: 20px;
        margin-right: 50px;

        img {
          height: inherit !important;
        }
      }
    }

    img {
          height: inherit !important;
        }

    .bio-content {
      margin-right: 50px;
    }
  }

  .gatsby-image-wrapper {
    position: relative !important;
  }

`


const BioImage = styled.div`

  .gatsby-image-wrapper {
    width: 300px;

    @media only screen and (max-width: ${props => props.theme.tablet}) {
      height: initial;
    }
  }



  img {
    width: 300px;
  }
`

const BioContent = styled.div`

  p {
    color: #fff;
    line-height: 32px;
    font-size: 20px;
  }

  @media only screen and (max-width: ${props => props.theme.tablet}) {
    width: 370px;
  }


`

const Bio = ({ bio, dir }) => {
  let bio_name;
  if (bio.name) {
    bio_name = bio.name.replace(/\s/g, '-').replace(/[.,]/g, '').toLowerCase()
  }

  let bio_content = bio.bio.replace(/\n/g, '<br />');
    return (
      <BioContainer id={bio_name} className={`direction-${dir}`}>

        <BioImage className="bio-image">
          <PreviewCompatibleImage
            imageInfo={{
              image: bio.photo,
              alt: ``,
            }}
          />
        </BioImage>

        <BioContent className="bio-content">
          <Heading className={`rel light`}>
            <strong>{bio.name}</strong> - {bio.title}
          </Heading>
          <p dangerouslySetInnerHTML={{ __html: bio_content }}>
          </p>
        </BioContent>

      </BioContainer>
    )

}

export default Bio
