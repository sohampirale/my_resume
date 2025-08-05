import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"
const ObjectId=Schema.Types.ObjectId;

const  userSchema =new Schema({
  username:{
    type:String,
    unique:true,
    required:true
  },
  password:{
    type:String,
    unique:true,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  hasPaid:{
    type:Boolean,
    default:false
  },
  hasPortfolio:{
    type:Boolean,
    default:false
  },
  portfolioCategory:{
    type:String,
    default:"1"
  }
})

userSchema.pre("save",async function(next){
  if(this.isModified("password")){
    try {
      this.password=await bcrypt.hash(this.password,5)

    } catch (error) {
      return next(error)      
    }
  }
  next()
})  

userSchema.methods.comparePassword=async function(password:string){
  return bcrypt.compare(password,this.password)
}

const socialSchema={
    github:{
      type:String
    },
    linkedIn:{
      type:String
    },
    mail:{
      type:String
    }
  }

export const User = mongoose.models.User || mongoose.model('User',userSchema)

const dataSchema = new Schema({
  owner:{
    type:ObjectId,
    ref:"User"
  },
  name:{
    type:String,
    default:"YOUR NAME"
  },
  slug:{
    type:String,
    required:true
  },
  tagLine:{
    type:String,
    default:"For ex: UI/UX designer & Frontend Devloper"
  },
  description:{
    type:String,
    default:"1 description about you"
  },
  location:{
    type:String,
    default:"YOUR LOCATION"
  },
  social:socialSchema,
  about:{
    type:String,
    default:"3-4 Lines description about you"
  },
  skills:[
    {
      name:{
        type:String,
        required:true
      },
      level:{
        type:Number,
        required:true
      }
    }
  ],
  stats:[{
    value:{
      type:String,
      default:"Example : 3+"
    },
    label:{
      type:String,
      default:"Example : Live projects"
    }
  }],
  projects:[{
    title:{
      type:String,
      default:"YOUR PROJECT TITLE"
    },
    descripiton:{
      type:String
    },
    image:{
      type:String
    },
    tech:[String],
    category:{
      type:String,
      default:"Example : Web or Mobile or Hardware"
    },
    github:{
      type:String,
    },
    demo:{
      type:String
    },
    featured:{
      type:Boolean
    }
  }],
  experience:[{
    position:{
      type:String,
      required:true,
    },
    company:{
      type:String,
      required:true
    },
    duration:{
      type:String,
      required:true
    },
    description:{
      type:String
    }
  }],
  education:[{
    degree:{
      type:String
    },
    school:{
      type:String
    },
    year:{
      type:String
    },
    cgpa:{
      type:String
    }
  }],
  contact:{
    email:{
      type:String
    },
    location:{
      type:String
    },
    social:socialSchema
  }
})

export const Data =mongoose.models.Data || mongoose.model('Data',dataSchema)

