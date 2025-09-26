package com.dbs.feedback.dto;

public class SentimentResponse {
    private String label;
    private double score;

    public SentimentResponse() {}

    public SentimentResponse(String label, double score) {
        this.label = label;
        this.score = score;
    }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }

    public double getScore() { return score; }
    public void setScore(double score) { this.score = score; }
}
