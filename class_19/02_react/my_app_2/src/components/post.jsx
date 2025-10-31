// bad code & styling

// export function PostComponent({ name, subtitle, time, image, description }) {
//   const style = { width: 200, backgroundColor: "lightbrown", borderRadius: 10, borderColor: "gray", borderWidth: 1, padding: 20 };

//   return (
//     <div style={style}>

//       <div style={{ display: "flex" }}>

//         <img src={image} style={{ width: 40, height: 40, borderRadius: 20 }} alt="Profile" />

//         <div style={{ fontSize: 10, marginLeft: 10 }}>
//           <b>{name}</b>
//           <div>{subtitle}</div>
//           {time !== undefined ? (
//             <div style={{ display: 'flex' }}>
//               <div>{time}</div>
//               <img
//                 src="https://media.istockphoto.com/id/931336618/vector/clock-vector-icon-isolated.jpg?s=612x612&w=0&k=20&c=I8EBJl8i6olqcrhAtKko74ydFEVbfCQ6s5Pbsx6vfas="
//                 style={{ width: 12, height: 12 }}
//                 alt="Clock"
//               />
//             </div>
//           ) : null}
//         </div>

//       </div>

//       <div style={{ fontSize: 12 }}>
//         {description}
//       </div>

//     </div>
//   );
// }




// good one

import './post.css';

export function PostComponent(props) {
/* this component i took from a random website */

  return (
    <article className="profile">
      <div className='title'>
        <div className="profile-image">
          <img src={props.image} />
        </div>

        <div className="profile-actions">
          <h2 className="profile-username">{props.name}</h2>

          <div className="btn btn--primary">{props.subtitle}</div>
          <p>Online: {props.timec}</p>
        </div>
      </div>

      <div className="profile-links">
        {props.description}
      </div>
    </article>
  );
}