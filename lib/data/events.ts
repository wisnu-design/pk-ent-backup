
export interface GraphQLImage {
  url: string;
}

export interface GraphQLBrand {
  id: string;
  thumbnail: GraphQLImage;
  title: string;
  slug: string;
  city: string;
  eventStage: string;
  date: string;
  description: string;
  upcoming: boolean;
  gallery: { url: string }[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  slug: string;
  bgImage: string;     
  thumbnail: string; 
}

export interface ClientBrand {
  id: string;
  title: string;
  description: string;
  slug: string;
  date:string
  thumbnail: string; 
  gallery: { url: string }[];
}


export interface Client {
  id: string;        
  title: string;      
  slug: string;      
  description: string; 
  thumbnail: string;    
  brands: ClientBrand[];
}

export interface GraphQLClient {
  name: string;
  slug: string;
  image: GraphQLImage;
  brands: GraphQLBrand[];
}

export interface ClientsQueryResponse {
  clients: GraphQLClient[];
}