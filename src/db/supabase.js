import { createClient } from "@supabase/supabase-js";

const ANON="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNDAyNzEzMSwiZXhwIjoxOTQ5NjAzMTMxfQ.b6iv5utRKCNzqMpF1-cjfiNy8f7tQs4ZSjuJnmvfne0"

const supaBase = createClient(
  process.env.SUPA_BASE_LINK || "https://tplggbxxtvgtfgfcygfq.supabase.co",
  process.env.SUPA_BASE_ANON || ANON

);

const SupaBase = {
  async createMessage(message) {
    const { data, error } = await supaBase.from("chat").insert([message]);
    return data[0];
  },
  async currentMessage(from, to) {
    const { data, error } = await supaBase
      .from("chat")
      .select()
      .in("from", [from, to])
      .in("to", [from, to]);

    if (error) {
      throw new Error("not message");
    }
    return data;
  },
  async getMessage(from) {
    const { data, error } = await supaBase
      .from("chat")
      .select()
      .eq("from", from);

    if (error) {
      throw new Error("not message");
    }

    return data;
  },
  async updateMessage(id, message) {
    try {
      const data = await supaBase.from("chat").update({ message }).eq("id", id);

      return data;
    } catch (e) {
      throw new Error();
    }
  },
};

export default SupaBase;
