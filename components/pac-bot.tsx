"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { PacMan, Ghost } from "./pac-man"
import { cn } from "@/lib/utils"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PacBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const messageText = input
    setInput("")
    await sendMessage({ text: messageText })
  }

  // Helper to get text content from message parts
  const getMessageText = (message: (typeof messages)[0]) => {
    if (!message.parts || !Array.isArray(message.parts)) return ""
    return message.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("")
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full",
          "bg-primary text-primary-foreground shadow-lg",
          "hover:scale-110 transition-all duration-300",
          "animate-pulse-glow"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-50",
            "w-[calc(100vw-3rem)] max-w-md h-[500px]",
            "bg-card border border-border rounded-lg shadow-2xl",
            "flex flex-col overflow-hidden",
            "animate-in slide-in-from-bottom-5 duration-300"
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-border bg-muted/50">
            <Ghost color="blue" size={28} />
            <div>
              <h3 className="font-arcade text-xs text-primary">PAC-BOT</h3>
              <p className="text-xs text-muted-foreground">
                Ask me about Zenia!
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="flex items-start gap-3">
                <Ghost color="blue" size={24} />
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-foreground">
                    WAKA WAKA! I'm Pac-Bot, your guide to Zenia's resume maze.
                    Ask me about her experience, projects, or skills!
                  </p>
                </div>
              </div>
            )}

            {messages.map((message) => {
              const text = getMessageText(message)
              if (!text) return null

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  {message.role === "assistant" ? (
                    <Ghost color="blue" size={24} />
                  ) : (
                    <PacMan size={24} direction="left" isEating={false} />
                  )}
                  <div
                    className={cn(
                      "rounded-lg p-3 max-w-[80%]",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    )}
                  >
                    <p className="text-sm whitespace-pre-wrap">{text}</p>
                  </div>
                </div>
              )
            })}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Ghost color="blue" size={24} />
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="w-2 h-2 bg-primary rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="flex items-start gap-3">
                <Ghost color="red" size={24} />
                <div className="bg-destructive/20 border border-destructive/30 rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm text-destructive">
                    Oops! Something went wrong. Please try again.
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-border bg-muted/30"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Zenia's experience..."
                className={cn(
                  "flex-1 px-4 py-2 rounded-lg",
                  "bg-background border border-border",
                  "text-sm text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50"
                )}
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick suggestions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                "What's Zenia's background?",
                "Tell me about her projects",
                "What are her skills?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setInput(suggestion)
                  }}
                  className={cn(
                    "px-2 py-1 text-xs rounded",
                    "bg-muted text-muted-foreground",
                    "hover:bg-primary/20 hover:text-primary",
                    "transition-colors"
                  )}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </form>
        </div>
      )}
    </>
  )
}
