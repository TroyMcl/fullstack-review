import React from 'react'


const TopResults = (props) => (
    <div>
    {props.repos.map(repo => {
      return <Repo repo={repo} />;
    })}
    </div>

)


const Repo = (props) => (
  <div>
    <h4>Repo form user {props.repo.name}</h4>
    <p>Repo name is {props.repo.repo_name}.</p>
    <p>Repo size {props.repo.size}  </p>
    <p>Go to Repo <a target="_blank" href={props.repo.url}>{props.repo.url}</a>{props.repo.url}</p>
  </div>
)
export default TopResults